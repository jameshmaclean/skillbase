package br.com.api.skillbase.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.skillbase.dtos.UserSkillDTO;
import br.com.api.skillbase.dtos.UserSkillResponseDTO;
import br.com.api.skillbase.services.UserSkillService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/userskill")
public class UserSkillController {
	@Autowired
	UserSkillService userSkillService;
	
	@SecurityRequirement(name = "Bearer Auth")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	@GetMapping
	public ResponseEntity<List<UserSkillResponseDTO>> listarSkillsUsuario(@RequestParam Long idUsuario){
		List<UserSkillResponseDTO> skillsUsuario = userSkillService.listarSkillsUsuario(idUsuario);
		return new ResponseEntity<>(skillsUsuario, HttpStatus.OK);
	}
	
	@SecurityRequirement(name = "Bearer Auth")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	@PostMapping("/cadastrar")
	public ResponseEntity<UserSkillResponseDTO> cadastrarAssociacao(@RequestBody UserSkillDTO userSkillDTO){
		UserSkillResponseDTO userSkill = userSkillService.associarSkill(userSkillDTO);
		return new ResponseEntity<>(userSkill, HttpStatus.OK);
	}
	
	@SecurityRequirement(name = "Bearer Auth")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	@PutMapping("/editar")
	public ResponseEntity<UserSkillResponseDTO> editarAssociacao(@RequestParam Long idAssociacao, @RequestBody UserSkillDTO userSkillDTO){
		UserSkillResponseDTO userSkill = userSkillService.editarAssociacao(idAssociacao, userSkillDTO);
		return new ResponseEntity<>(userSkill, HttpStatus.OK);
	}
	
	@SecurityRequirement(name = "Bearer Auth")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	@DeleteMapping("/deletar")
	public ResponseEntity<String> deletarAssociacao(@RequestParam Long idAssociacao){
		String mensagem = userSkillService.deletarAssociacao(idAssociacao);
		return new ResponseEntity<>(mensagem, HttpStatus.OK);
	}

}
