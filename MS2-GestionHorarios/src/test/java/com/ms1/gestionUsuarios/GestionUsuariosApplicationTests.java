package com.ms1.gestionUsuarios;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ms1.gestionUsuarios.dto.*;
import com.ms1.gestionUsuarios.entities.Convocatoria;
import com.ms1.gestionUsuarios.entities.Horario;
import com.ms1.gestionUsuarios.entities.Materia;
import com.ms1.gestionUsuarios.entities.Usuario;
import com.ms1.gestionUsuarios.repositories.AsignaturaRepository;
import com.ms1.gestionUsuarios.repositories.SlotsRepository;
import com.ms1.gestionUsuarios.repositories.UsuarioRepository;
import com.ms1.gestionUsuarios.service.AsignaturaServicio;
import com.ms1.gestionUsuarios.service.JwtUserDetailsService;
import com.ms1.gestionUsuarios.service.SlotsServicio;
import org.junit.After;
import org.junit.Before;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
@DisplayName("Test")
 class GestionUsuariosApplicationTests {


	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private UsuarioRepository usuarioRepository;
	@Autowired
	private JwtUserDetailsService usuarioService;
	@Autowired
	private SlotsServicio slotsServicio;
	@Autowired
	private SlotsRepository slotsRepository;
	@Autowired
	private AsignaturaServicio asignaturaServicio;
	@Autowired
	private AsignaturaRepository asignaturaRepository;

	public void usuarioToken() {
	    String username = "test";
	    String password = "test";
	    String nombre = "test";

	    Usuario usuario = new Usuario();
	    usuario.setId(0);
	    usuario.setUsername(username);
	    usuario.setPassword(password);
	    usuario.setNombre(nombre);
	    usuario.setApellido1("test");
	    usuario.setApellido2("test");
	    usuario.setRoles(new HashSet<>(Arrays.asList(Usuario.Role.VICERRECTORADO)));

	    if (!usuarioRepository.findByUsername(usuario.getUsername()).isPresent()) {
	        usuarioService.guardarUsuario(usuario);
	    }
	}



	public String token() throws Exception {
		JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
		jwtRequestDTO.setEmail("test");
		jwtRequestDTO.setPassword("test");

		String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);
		String token;
		MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(requestBody))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").isNotEmpty())
				.andReturn();

		String responseContent = result.getResponse().getContentAsString();
		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(responseContent);
		token = jsonNode.get("token").asText();

		return token;
	}


	public Optional<Usuario> crearUsuario(){
		String username = "usuario_" + UUID.randomUUID().toString();
		String password = UUID.randomUUID().toString() ;
		String nombre = "Nombre" + UUID.randomUUID().toString();
		Usuario usuario = new Usuario();
		usuario.setId(0);
		usuario.setUsername(username);
		usuario.setPassword(password);
		usuario.setNombre(nombre);
		usuario.setApellido1("User");
		usuario.setApellido2("Surname");
		usuario.setRoles(new HashSet<>(Arrays.asList(Usuario.Role.VICERRECTORADO)));

		usuarioService.guardarUsuario(usuario);
		Optional<Usuario> usuarioOpt = usuarioRepository.findByUsername(usuario.getUsername());
		return usuarioOpt;
	}

	public void limpiar(Usuario usuario){
		usuarioRepository.delete(usuario);
	}

	@BeforeEach
	public void initializeDatabase() {
	    usuarioRepository.deleteAll();
	    crearUsuario();
	    usuarioToken();
	}


	@DisplayName("Modificar contraseña")
	@Test
	public void testResetContrasena() throws Exception {
	    Usuario usuario = crearUsuario().get();
	    ResetPasswordDTO resetPasswordDTO = new ResetPasswordDTO();
	    resetPasswordDTO.setUsername(usuario.getEmail());

	    String requestBody = new ObjectMapper().writeValueAsString(resetPasswordDTO);

	    mockMvc.perform(MockMvcRequestBuilders.post("/passwordreset")
	                    .contentType(MediaType.APPLICATION_JSON)
	                    .content(requestBody))
	            .andExpect(status().isOk());

	    limpiar(usuario);
	}


	@DisplayName("Generar Token JWT")
	@Test
	public void testAuthenticate() throws Exception {
	    Usuario usuario = crearUsuario().get();
	    JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	    jwtRequestDTO.setEmail(usuario.getEmail());
	    jwtRequestDTO.setPassword(usuario.getPassword());

	    String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);

	    mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                    .contentType(MediaType.APPLICATION_JSON)
	                    .content(requestBody))
	            .andExpect(status().isOk())
	            .andExpect(jsonPath("$.token").isNotEmpty());

	    limpiar(usuario);
	}


	@Nested
	@DisplayName("GET /usuarios")
	public class GetUsuarios {

	    @DisplayName("Codigo 200 obtenerTodosLosUsuarios")
	    @Test
	    public void obtenerTodosLosUsuarios() throws Exception {
	        String token = obtainAuthToken();

	        mockMvc.perform(MockMvcRequestBuilders.get("/usuarios")
	                        .header("Authorization", "Bearer " + token))
	                .andExpect(status().isOk());
	    }

	    @DisplayName("Codigo 401 obtenerTodosLosUsuarios")
	    @Test
	    public void ErrorAlobtenerTodosLosUsuarios() throws Exception {
	        mockMvc.perform(MockMvcRequestBuilders.get("/usuarios"))
	                .andExpect(status().isUnauthorized());
	    }

	    private String obtainAuthToken() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);

	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        return jsonNode.get("token").asText();
	    }
	}


	@Nested
	@DisplayName("POST /usuarios")
	public class CrearusuarioUsuario {

	    @DisplayName("Codigo 201 crearUnUsuarioCorrectamente")
	    @Test
	    public void crearUnUsuarioCorrectamente() throws Exception {
	        String token = obtainAuthToken();

	        Set<Usuario.Role> roles = new HashSet<>();
	        roles.add(Usuario.Role.CORRECTOR);
	        UsuarioDTO usuarioDTO = new UsuarioDTO(null, "userPOST", "0000", "userNamePOST", "asf", "as", roles);
	        String requestBodyPetition = new ObjectMapper().writeValueAsString(usuarioDTO);

	        mockMvc.perform(MockMvcRequestBuilders.post("/usuarios")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .header("Authorization", "Bearer " + token)
	                        .content(requestBodyPetition))
	                .andExpect(status().isCreated());

	        Optional<Usuario> usuarioABorrar = usuarioRepository.findByUsername(usuarioDTO.getUsername());

	        if (usuarioABorrar.isPresent()) {
	            limpiar(usuarioABorrar.get());
	        }
	    }

	    @DisplayName("Codigo 401 ErrorAlobtenerTodosLosUsuarios")
	    @Test
	    public void ErrorAlobtenerTodosLosUsuarios() throws Exception {
	        mockMvc.perform(MockMvcRequestBuilders.post("/usuarios"))
	                .andExpect(status().isUnauthorized());
	    }

	    @DisplayName("Codigo 409 UsuarioDuplicadoBD")
	    @Test
	    public void UsuarioDuplicadoBD() throws Exception {
	        String token = obtainAuthToken();

	        Usuario usuario = crearUsuario().get();
	        UsuarioDTO usuarioDTO = new UsuarioDTO();
	        usuarioDTO.setUsername(usuario.getUsername());
	        usuarioDTO.setId(usuario.getId());
	        usuarioDTO.setNombre(usuario.getNombre());
	        usuarioDTO.setPassword(usuario.getPassword());
	        usuarioDTO.setApellido2(usuario.getApellido2());
	        usuarioDTO.setApellido1(usuario.getApellido1());
	        String requestBodyPetition = new ObjectMapper().writeValueAsString(usuarioDTO);

	        mockMvc.perform(MockMvcRequestBuilders.post("/usuarios")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .header("Authorization", "Bearer " + token)
	                        .content(requestBodyPetition))
	                .andExpect(status().isConflict());

	        Optional<Usuario> usuarioABorrar = usuarioRepository.findByUsername(usuarioDTO.getUsername());

	        if (usuarioABorrar.isPresent()) {
	            limpiar(usuarioABorrar.get());
	        }
	        limpiar(usuario);
	    }

	    private String obtainAuthToken() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);

	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        return jsonNode.get("token").asText();
	    }
	}


	@Nested
	@DisplayName("GET /usuarios/{id}")
	public class usuarioConcreto {

	    @DisplayName("Codigo 200 obtenerUnUsuario")
	    @Test
	    public void obtenerUnUsuario() throws Exception {
	        String token = obtainAuthToken();
	        Usuario usuario = crearUsuario().get();
	        mockMvc.perform(MockMvcRequestBuilders.get("/usuarios/" + usuario.getId())
	                        .header("Authorization", "Bearer " + token))
	                .andExpect(status().isOk());
	        limpiar(usuario);
	    }

	    @DisplayName("Codigo 401 ErrorAlobtenerUnUsuario")
	    @Test
	    public void ErrorAlobtenerUnUsuario() throws Exception {
	        Usuario usuario = crearUsuario().get();
	        mockMvc.perform(MockMvcRequestBuilders.get("/usuarios/" + usuario.getId()))
	                .andExpect(status().isUnauthorized());
	        limpiar(usuario);
	    }

	    @DisplayName("Codigo 404 obtenerUnUsuarioNoExistente")
	    @Test
	    public void obtenerUnUsuarioNoExistente() throws Exception {
	        String token = obtainAuthToken();
	        Usuario usuario = crearUsuario().get();
	        Integer id = usuario.getId();
	        limpiar(usuario);

	        mockMvc.perform(MockMvcRequestBuilders.get("/usuarios/" + id)
	                        .header("Authorization", "Bearer " + token))
	                .andExpect(status().isNotFound());
	    }

	    private String obtainAuthToken() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);

	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        return jsonNode.get("token").asText();
	    }
	}


	@Nested
	@DisplayName("PUT /usuarios/{id}")
	public class ModificarusuarioConcreto {

	    @DisplayName("Codigo 200 modificarUsuario")
	    @Test
	    public void modificarUsuario() throws Exception {
	        String token = obtainAuthToken();
	        Usuario usuario = crearUsuario().get();
	        String pass = usuario.getPassword();
	        UsuarioDTO usuarioDTO = new UsuarioDTO();
	        usuarioDTO.setId(usuario.getId());
	        usuarioDTO.setUsername(usuario.getUsername());
	        usuarioDTO.setNombre(usuario.getNombre());
	        usuarioDTO.setPassword(pass);
	        usuarioDTO.setApellido1(usuario.getApellido1());
	        usuarioDTO.setApellido2("Este es el modificado");
	        usuarioDTO.setRoles(usuario.getRoles());

	        String requestBody = new ObjectMapper().writeValueAsString(usuarioDTO);

	        mockMvc.perform(MockMvcRequestBuilders.put("/usuarios/" + usuario.getId())
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBody)
	                        .header("Authorization", "Bearer " + token))
	                .andExpect(status().isOk());

	        limpiar(usuario);
	    }

	    @DisplayName("Codigo 401 ErrorAlobtenerUnUsuario")
	    @Test
	    public void ErrorAlobtenerUnUsuario() throws Exception {
	        Usuario usuario = crearUsuario().get();
	        mockMvc.perform(MockMvcRequestBuilders.put("/usuarios/" + usuario.getId()))
	                .andExpect(status().isUnauthorized());
	        limpiar(usuario);
	    }

	    @DisplayName("Codigo 404 modificarUsuarioInexistente")
	    @Test
	    public void modificarUsuarioInexistente() throws Exception {
	        String token = obtainAuthToken();
	        Usuario usuario = crearUsuario().get();
	        Integer id = usuario.getId();
	        String pass = usuario.getPassword();
	        UsuarioDTO usuarioDTO = new UsuarioDTO();
	        usuarioDTO.setId(usuario.getId());
	        usuarioDTO.setUsername(usuario.getUsername());
	        usuarioDTO.setNombre(usuario.getNombre());
	        usuarioDTO.setPassword(pass);
	        usuarioDTO.setApellido1(usuario.getApellido1());
	        usuarioDTO.setApellido2("Este es el modificado");
	        usuarioDTO.setRoles(usuario.getRoles());

	        limpiar(usuario);

	        String requestBody = new ObjectMapper().writeValueAsString(usuarioDTO);

	        mockMvc.perform(MockMvcRequestBuilders.put("/usuarios/" + id)
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBody)
	                        .header("Authorization", "Bearer " + token))
	                .andExpect(status().isNotFound());
	    }

	    private String obtainAuthToken() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);

	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        return jsonNode.get("token").asText();
	    }
	}

	@Nested
	@DisplayName("DELETE /usuarios/{id}")
	public class BorrarusuarioConcreto {

	    @DisplayName("Codigo 200 eliminarUsuario")
	    @Test
	    public void eliminarUsuario() throws Exception {
	        String token = obtainAuthToken();
	        Usuario usuario = crearUsuario().get();
	        mockMvc.perform(MockMvcRequestBuilders.delete("/usuarios/" + usuario.getId())
	                        .header("Authorization", "Bearer " + token))
	                .andExpect(status().isOk());
	        limpiar(usuario);
	    }

	    @DisplayName("Codigo 401 eliminarUsuarioSinAuth")
	    @Test
	    public void ErrorAlobtenerUnUsuarios() throws Exception {
	        mockMvc.perform(MockMvcRequestBuilders.delete("/usuarios/3"))
	                .andExpect(status().isUnauthorized());
	    }

	    @DisplayName("Codigo 404 eliminarUsuarioNoExistente")
	    @Test
	    public void eliminarUsuarioNoExistente() throws Exception {
	        String token = obtainAuthToken();
	        mockMvc.perform(MockMvcRequestBuilders.delete("/usuarios/0")
	                        .header("Authorization", "Bearer " + token))
	                .andExpect(status().isNotFound());
	    }

	    private String obtainAuthToken() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);

	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        return jsonNode.get("token").asText();
	    }
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	@Nested
	@DisplayName("GET /materias")
	public class GetMaterias {

	    @DisplayName("Codigo 200 obtenerTodasLasMaterias")
	    @Test
	    public void obtenerTodasLasMaterias() throws Exception {
	        String token = obtainAuthToken();

	        mockMvc.perform(MockMvcRequestBuilders.get("/materias")
	                        .header("Authorization", "Bearer " + token))
	                .andExpect(status().isOk());
	    }

	    @DisplayName("Codigo 403 obtenerTodasLasMaterias")
	    @Test
	    public void ErrorAlobtenerTodasLasMaterias() throws Exception {
	        mockMvc.perform(MockMvcRequestBuilders.get("/materias"))
	                .andExpect(status().isUnauthorized());
	    }

	    private String obtainAuthToken() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);

	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        return jsonNode.get("token").asText();
	    }
	}



	@Nested
	@DisplayName("POST /materias")
	public class CrearMaterias {

	    @DisplayName("Codigo 200 obtenerTodasLasMaterias")
	    @Test
	    public void obtenerTodasLasMaterias() throws Exception {
	        String token = obtainAuthToken();

	        AsignaturaDTO asignaturaDTO = new AsignaturaDTO(3L, "matematicas", true);
	        String requestBodyPetition = new ObjectMapper().writeValueAsString(asignaturaDTO);

	        mockMvc.perform(MockMvcRequestBuilders.post("/materias")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .header("Authorization", "Bearer " + token)
	                        .content(requestBodyPetition))
	                .andExpect(status().isCreated());
	    }

	    @DisplayName("Codigo 403 obtenerTodasLasMaterias")
	    @Test
	    public void ErrorAlobtenerTodasLasMaterias() throws Exception {
	        mockMvc.perform(MockMvcRequestBuilders.post("/materias"))
	                .andExpect(status().isUnauthorized());
	    }

	    private String obtainAuthToken() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);

	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        return jsonNode.get("token").asText();
	    }
	}


	@Nested
	@DisplayName("GET /materias/{id}")
	public class MateriaConcreto {

	    @DisplayName("Codigo 200 obtenerUnaMateria")
	    @Test
	    public void obtenerUnaMateria() throws Exception {
	        String token = obtainAuthToken();

	        mockMvc.perform(MockMvcRequestBuilders.get("/materias/1")
	                        .header("Authorization", "Bearer " + token))
	                .andExpect(status().isOk());
	    }

	    @DisplayName("Codigo 401 obtenerUnaMateria")
	    @Test
	    public void ErrorAlobtenerUnaMateria() throws Exception {
	        mockMvc.perform(MockMvcRequestBuilders.get("/materias/1"))
	                .andExpect(status().isUnauthorized());
	    }

	    @DisplayName("Codigo 404 obtenerUnaMateria")
	    @Test
	    public void obtenerUnaMateriaNoExistente() throws Exception {
	        String token = obtainAuthToken();

	        mockMvc.perform(MockMvcRequestBuilders.get("/materias/0")
	                        .header("Authorization", "Bearer " + token))
	                .andExpect(status().isNotFound());
	    }

	    private String obtainAuthToken() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);

	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        return jsonNode.get("token").asText();
	    }
	}

	
	@Nested
	@DisplayName("POST /materias/{id}")
	public class ModificarMateriaConcreto {

	    @DisplayName("Codigo 200 obtenerMateria")
	    @Test
	    public void obtenerUnaMateria() throws Exception {
	        String token = obtainAuthToken();

	        AsignaturaDTO asignaturaDTO = new AsignaturaDTO(null, "matematicas", true);
	        String requestBodyPetition = new ObjectMapper().writeValueAsString(asignaturaDTO);

	        mockMvc.perform(MockMvcRequestBuilders.put("/materias/52")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .header("Authorization", "Bearer " + token)
	                        .content(requestBodyPetition))
	                .andExpect(status().isCreated());
	    }

	    @DisplayName("Codigo 401 obtenerMateria")
	    @Test
	    public void ErrorAlobtenerUnaMateria() throws Exception {
	        mockMvc.perform(MockMvcRequestBuilders.put("/materias/1"))
	                .andExpect(status().isUnauthorized());
	    }

	    @DisplayName("Codigo 404 obtenerMateriaID")
	    @Test
	    public void obtenerMateriaNoExistente() throws Exception {
	        String token = obtainAuthToken();

	        AsignaturaDTO asignaturaDTO = new AsignaturaDTO();
	        asignaturaDTO.setId(52L);
	        asignaturaDTO.setEliminada(true);
	        asignaturaDTO.setNombre("matematicas");
	        asignaturaRepository.save(asignaturaDTO.asignatura());

	        mockMvc.perform(MockMvcRequestBuilders.put("/materias/" + asignaturaDTO.getId())
	                        .header("Authorization", "Bearer " + token)
	                        .content(null))
	                .andExpect(status().isNotFound());
	    }

	    private String obtainAuthToken() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);

	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        return jsonNode.get("token").asText();
	    }
	}

	@Nested
	@DisplayName("DELETE /materias/{id}")
	public class BorrarMateriaConcreta {

	    @DisplayName("Codigo 200 eliminarMateria")
	    @Test
	    public void eliminarMateria() throws Exception {
	        String token = obtainAuthToken();

	        AsignaturaDTO asignaturaDTO = new AsignaturaDTO();
	        asignaturaDTO.setEliminada(true);
	        asignaturaDTO.setNombre("MatermaticasASIV");
	        asignaturaDTO.setId(0L);

	        asignaturaRepository.save(asignaturaDTO.asignatura());
	        Optional<Materia> optionalMateria = asignaturaRepository.findByNombre(asignaturaDTO.asignatura().getNombre());

	        mockMvc.perform(MockMvcRequestBuilders.delete("/materias/" + optionalMateria.get().getId())
	                        .header("Authorization", "Bearer " + token))
	                .andExpect(status().isOk());

	        asignaturaRepository.delete(optionalMateria.get());
	    }

	    @DisplayName("Codigo 401 eliminarMateriaSinAuth")
	    @Test
	    public void ErrorElimMateria() throws Exception {
	        mockMvc.perform(MockMvcRequestBuilders.delete("/materias/3"))
	                .andExpect(status().isUnauthorized());
	    }

	    @DisplayName("Codigo 404 eliminarMateriaNoExistente")
	    @Test
	    public void eliminarMateriaNoExistente() throws Exception {
	        String token = obtainAuthToken();

	        mockMvc.perform(MockMvcRequestBuilders.delete("/materias/0")
	                        .header("Authorization", "Bearer " + token))
	                .andExpect(status().isNotFound());
	    }

	    private String obtainAuthToken() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);

	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        return jsonNode.get("token").asText();
	    }
	}


	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	@Nested
	@DisplayName("GET /pruebas")
	public class pruebaPrueba {

	    @DisplayName("Codigo 200 obtenerTodasLasPruebas")
	    @Test
	    public void obtenerTodasLasPruebas() throws Exception {
	        String token = obtainAuthToken();

	        mockMvc.perform(MockMvcRequestBuilders.get("/pruebas")
	                        .header("Authorization", "Bearer " + token))
	                .andExpect(status().isOk());
	    }

	    @DisplayName("Codigo 403 obtenerTodasLasPruebas")
	    @Test
	    public void ErrorAlobtenerTodasLasPruebas() throws Exception {
	        mockMvc.perform(MockMvcRequestBuilders.get("/pruebas"))
	                .andExpect(status().isUnauthorized());
	    }

	    private String obtainAuthToken() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);

	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        return jsonNode.get("token").asText();
	    }
	}


	@Nested
	@DisplayName("POST /pruebas")
	public class CrearPrueba {
	    @DisplayName("Codigo 201 crearPrueba")
	    @Test
	    public void crearPrueba() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);
	        String token;
	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                .contentType(MediaType.APPLICATION_JSON)
	                .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        token = jsonNode.get("token").asText();
	        System.out.println("Token: " + token);

	        // Suponiendo que ya tienes la variable "token" con el valor del token obtenido anteriormente
	        PruebaDTO pruebaDTO = new PruebaDTO();
	        pruebaDTO.setTitulo("Prueba de Matemáticas");
	        String requestBodyPetition = new ObjectMapper().writeValueAsString(pruebaDTO);

	        mockMvc.perform(MockMvcRequestBuilders.post("/pruebas")
	                .contentType(MediaType.APPLICATION_JSON)
	                .header("Authorization", "Bearer " + token)
	                .content(requestBodyPetition))
	                .andExpect(status().isCreated());
	    }

	    @DisplayName("Codigo 403 crearPruebaSinAuth")
	    @Test
	    public void ErrorCrearPrueba() throws Exception {
	        mockMvc.perform(MockMvcRequestBuilders.post("/pruebas"))
	                .andExpect(status().isUnauthorized());
	    }
	}
	
	@Nested
	@DisplayName("GET pruebas/{id}")
	public class pruebaConcreta {
	    @DisplayName("Codigo 200 obtenerUnaPrueba")
	    @Test
	    public void obtenerUnaPrueba() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);
	        String token;
	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                .contentType(MediaType.APPLICATION_JSON)
	                .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        token = jsonNode.get("token").asText();
	        System.out.println("Token: " + token);

	        // Suponiendo que ya tienes la variable "token" con el valor del token obtenido anteriormente

	        mockMvc.perform(MockMvcRequestBuilders.get("/pruebas/1")
	                .header("Authorization", "Bearer " + token))
	                .andExpect(status().isOk());
	    }

	    @DisplayName("Codigo 401 obtenerUnaPruebaSinAuth")
	    @Test
	    public void ErrorAlobtenerUnaPrueba() throws Exception {
	        mockMvc.perform(MockMvcRequestBuilders.get("/pruebas/1"))
	                .andExpect(status().isUnauthorized());
	    }

	    @DisplayName("Codigo 404 obtenerUnaPruebaNoExistente")
	    @Test
	    public void obtenerUnaPruebaNoExistente() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);
	        String token;
	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                .contentType(MediaType.APPLICATION_JSON)
	                .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        token = jsonNode.get("token").asText();
	        System.out.println("Token: " + token);

	        // Suponiendo que ya tienes la variable "token" con el valor del token obtenido anteriormente

	        mockMvc.perform(MockMvcRequestBuilders.get("/pruebas/0")
	                .header("Authorization", "Bearer " + token))
	                .andExpect(status().isNotFound());
	    }
	}

	@Nested
	@DisplayName("POST pruebas/{id}")
	public class ModificarPruebaConcreta {
	    @DisplayName("Codigo 200 modificarPrueba")
	    @Test
	    public void modificarPrueba() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);
	        String token;
	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                .contentType(MediaType.APPLICATION_JSON)
	                .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        token = jsonNode.get("token").asText();
	        System.out.println("Token: " + token);

	        // Suponiendo que ya tienes la variable "token" con el valor del token obtenido anteriormente
	        PruebaDTO prueba = new PruebaDTO();
	        prueba.setId(52L);
	        prueba.setEliminada(true);
	        prueba.setMateria(new Materia(null, "matematicas", true));
	        prueba.setSlots(new Horario());

	        String requestBodyPetition = new ObjectMapper().writeValueAsString(prueba);

	        mockMvc.perform(MockMvcRequestBuilders.put("/pruebas/" + prueba.getId())
	                .contentType(MediaType.APPLICATION_JSON)
	                .header("Authorization", "Bearer " + token)
	                .content(requestBodyPetition))
	                .andExpect(status().isCreated());
	    }

	    @DisplayName("Codigo 401 modificarPruebaSinAuth")
	    @Test
	    public void ErrorAlModificarUnaPrueba() throws Exception {
	        mockMvc.perform(MockMvcRequestBuilders.put("/pruebas/1"))
	                .andExpect(status().isUnauthorized());
	    }

	    @DisplayName("Codigo 404 modificarPruebaNoExistente")
	    @Test
	    public void modificarPruebaNoExistente() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);
	        String token;
	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                .contentType(MediaType.APPLICATION_JSON)
	                .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        token = jsonNode.get("token").asText();
	        System.out.println("Token: " + token);

	        // Suponiendo que ya tienes la variable "token" con el valor del token obtenido anteriormente
	        PruebaDTO prueba = new PruebaDTO();
	        prueba.setId(52L);
	        prueba.setEliminada(true);
	        prueba.setMateria(new Materia(null, "matematicas", true));
	        prueba.setSlots(new Horario());

	        String requestBodyPetition = new ObjectMapper().writeValueAsString(prueba);

	        mockMvc.perform(MockMvcRequestBuilders.put("/pruebas/" + prueba.getId())
	                .header("Authorization", "Bearer " + token)
	                .content(requestBodyPetition))
	                .andExpect(status().isNotFound());
	    }
	}

	@Nested
	@DisplayName("DELETE pruebas/{id}")
	public class BorrarPruebaConcreta {

	    @DisplayName("Codigo 200 eliminarPrueba")
	    @Test
	    public void eliminarMateria() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);
	        String token;
	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        token = jsonNode.get("token").asText();
	        System.out.println("Token: " + token);

	        // Suponiendo que ya tienes la variable "token" con el valor del token obtenido anteriormente

	        mockMvc.perform(MockMvcRequestBuilders.delete("/pruebas/102")
	                        .header("Authorization", "Bearer " + token))
	                .andExpect(status().isOk());
	    }

	    @DisplayName("Codigo 401 eliminarPruebaSinAuth")
	    @Test
	    public void ErrorElimMateria() throws Exception {
	        mockMvc.perform(MockMvcRequestBuilders.delete("/pruebas/3"))
	                .andExpect(status().isUnauthorized());
	    }

	    @DisplayName("Codigo 404 eliminarPruebaNoExistente")
	    @Test
	    public void eliminarMateriaNoExistente() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);
	        String token;
	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        token = jsonNode.get("token").asText();
	        System.out.println("Token: " + token);

	        // Suponiendo que ya tienes la variable "token" con el valor del token obtenido anteriormente

	        PruebaDTO prueba = new PruebaDTO();
	        prueba.setId(0L);

	        String requestBodyPetition = new ObjectMapper().writeValueAsString(prueba);

	        mockMvc.perform(MockMvcRequestBuilders.delete("/pruebas/" + prueba.getId())
	                        .header("Authorization", "Bearer " + token)
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBodyPetition))
	                .andExpect(status().isNotFound());
	    }

	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	@Nested
	@DisplayName("GET /slots")
	public class SlotSlot {

	    @DisplayName("Codigo 200 obtenerTodosLosSlots")
	    @Test
	    public void obtenerTodasLasPruebas() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);
	        String token;
	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        token = jsonNode.get("token").asText();
	        System.out.println("Token: " + token);

	        // Suponiendo que ya tienes la variable "token" con el valor del token obtenido anteriormente

	        mockMvc.perform(MockMvcRequestBuilders.get("/slots")
	                        .header("Authorization", "Bearer " + token))
	                .andExpect(status().isOk());
	    }

	    @DisplayName("Codigo 403 obtenerTodosLosSlots")
	    @Test
	    public void ErrorAlobtenerTodasLasPruebas() throws Exception {
	        String invalidToken = "invalid_token";

	        mockMvc.perform(MockMvcRequestBuilders.get("/slots")
	                        .header("Authorization", "Bearer " + invalidToken))
	                .andExpect(status().isForbidden());
	    }
	}

	@Nested
	@DisplayName("POST /slots")
	public class CrearSlot {

	    @DisplayName("Codigo 200 obtenerTodosLosSlots")
	    @Test
	    public void obtenerTodasLasMaterias() throws Exception {
	        String requestBodyPetition = new ObjectMapper().writeValueAsString(null);

	        mockMvc.perform(MockMvcRequestBuilders.post("/slots")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .header("Authorization", "Bearer " + token())
	                        .content(requestBodyPetition))
	                .andExpect(status().isCreated());
	    }

	    @DisplayName("Codigo 403 obtenerTodosLosSlots")
	    @Test
	    public void ErrorAlobtenerTodasLasPruebas() throws Exception {
	        mockMvc.perform(MockMvcRequestBuilders.post("/slots"))
	                .andExpect(status().isUnauthorized());
	    }

	    private String token() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);

	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        return jsonNode.get("token").asText();
	    }
	}
	@Nested
	@DisplayName("GET slots/{id}")
	public class SlotConcreta {

	    @DisplayName("Codigo 200 obtenerUnSlot")
	    @Test
	    public void obtenerUnaMateria() throws Exception {
	        mockMvc.perform(MockMvcRequestBuilders.get("/slots/1")
	                        .header("Authorization", "Bearer " + token()))
	                .andExpect(status().isOk());
	    }

	    @DisplayName("Codigo 401 obtenerUnSlot")
	    @Test
	    public void ErrorAlobtenerUnaPrueba() throws Exception {
	        mockMvc.perform(MockMvcRequestBuilders.get("/slots/1"))
	                .andExpect(status().isUnauthorized());
	    }

	    @DisplayName("Codigo 404 obtenerUnSlot")
	    @Test
	    public void obtenerUnaMateriaNoExistente() throws Exception {
	        mockMvc.perform(MockMvcRequestBuilders.get("/slots/0")
	                        .header("Authorization", "Bearer " + token()))
	                .andExpect(status().isNotFound());
	    }

	    private String token() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);

	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        return jsonNode.get("token").asText();
	    }
	}
	
	@Nested
	@DisplayName("POST slots/{id}")
	public class ModificarSlotConcreto {

	    @DisplayName("Codigo 200 obtenerSlot")
	    @Test
	    public void obtenerUnaPrueba() throws Exception {
	        // Suponiendo que ya tienes la variable "token" con el valor del token obtenido anteriormente
	        HorarioDTO horarioDTO = new HorarioDTO(1L, LocalTime.now(), LocalTime.now(), LocalDate.now(), Integer.valueOf(1), true, new Convocatoria());
	        String requestBodyPetition = new ObjectMapper().writeValueAsString(horarioDTO);

	        mockMvc.perform(MockMvcRequestBuilders.put("/slots/52")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .header("Authorization", "Bearer " + token())
	                        .content(requestBodyPetition))
	                .andExpect(status().isCreated());
	    }

	    @DisplayName("Codigo 401 obtenerSlot")
	    @Test
	    public void ErrorAlobtenerUnaMateria() throws Exception {
	        mockMvc.perform(MockMvcRequestBuilders.put("/slots/1"))
	                .andExpect(status().isUnauthorized());
	    }

	    @DisplayName("Codigo 404 obtenerSlotID")
	    @Test
	    public void obtenerMateriaNoExistente() throws Exception {
	        String token = getToken();

	        HorarioDTO horario = new HorarioDTO();
	        horario.setId(52L);
	        horario.setEliminada(true);
	        horario.setDuracion(Integer.valueOf(1));
	        horario.setFecha(LocalDate.now());
	        horario.setHoraFin(LocalTime.now());
	        horario.setHoraInicio(LocalTime.now());
	        horario.setConvocatoria(new Convocatoria(null, LocalDate.now(), LocalDate.now(), "prueba"));

	        String requestBody = new ObjectMapper().writeValueAsString(horario);

	        mockMvc.perform(MockMvcRequestBuilders.put("/slots/" + horario.getId())
	                        .header("Authorization", "Bearer " + token)
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBody))
	                .andExpect(status().isNotFound());
	    }

	    private String token() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);

	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        return jsonNode.get("token").asText();
	    }

	    private String getToken() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);

	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        return jsonNode.get("token").asText();
	    }
	}
	
	@Nested
	@DisplayName("DELET slots/{id}")
	public class BorrarSlotConcreto {

	    @DisplayName("Codigo 200 eliminarSlot")
	    @Test
	    public void eliminarMateria() throws Exception {
	        mockMvc.perform(MockMvcRequestBuilders.delete("/slots/1")
	                        .header("Authorization", "Bearer " + token()))
	                .andExpect(status().isOk());
	    }

	    @DisplayName("Codigo 401 eliminarSlotSinAuth")
	    @Test
	    public void ErrorElimMateria() throws Exception {
	        mockMvc.perform(MockMvcRequestBuilders.delete("/slots/3"))
	                .andExpect(status().isUnauthorized());
	    }

	    @DisplayName("Codigo 404 eliminarSlotNoExistente")
	    @Test
	    public void eliminarMateriaNoExistente() throws Exception {
	        mockMvc.perform(MockMvcRequestBuilders.delete("/slots/0")
	                        .header("Authorization", "Bearer " + token()))
	                .andExpect(status().isNotFound());
	    }

	    private String token() throws Exception {
	        JwtRequestDTO jwtRequestDTO = new JwtRequestDTO();
	        jwtRequestDTO.setEmail("1234");
	        jwtRequestDTO.setPassword("0000");

	        String requestBody = new ObjectMapper().writeValueAsString(jwtRequestDTO);

	        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/login")
	                        .contentType(MediaType.APPLICATION_JSON)
	                        .content(requestBody))
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.token").isNotEmpty())
	                .andReturn();

	        String responseContent = result.getResponse().getContentAsString();
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseContent);
	        return jsonNode.get("token").asText();
	    }
	}
}
