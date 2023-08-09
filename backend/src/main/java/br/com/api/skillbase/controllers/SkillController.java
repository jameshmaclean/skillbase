package br.com.api.skillbase.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.api.skillbase.domains.Foto;
import br.com.api.skillbase.domains.Skill;
import br.com.api.skillbase.dtos.SkillDTO;
import br.com.api.skillbase.services.SkillService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/skills")
@CrossOrigin(origins = "*", maxAge = 3600)
public class SkillController {
	@Autowired
	SkillService skillService;
	
	@SecurityRequirement(name = "Bearer Auth")
    @PreAuthorize("hasRole('USER')")
	@GetMapping("/listarTodas")
	public ResponseEntity<List<Skill>> listarSkills(){
		List<Skill> lista = skillService.listarTodas();
		return new ResponseEntity<>(lista, HttpStatus.OK);
	}
	
	@SecurityRequirement(name = "Bearer Auth")
    @PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/cadastrar")
	public ResponseEntity<Skill> cadastrarSkill(@RequestPart("skill") SkillDTO skillDTO, @RequestPart("foto") MultipartFile foto){
		Skill skill = skillService.cadastrarSkill(skillDTO, foto);
		return new ResponseEntity<>(skill, HttpStatus.OK);
	}
	
	@Transactional
	@GetMapping("foto/{id}")
	public ResponseEntity<byte[]> buscarFoto(@PathVariable Long id) {
		Foto foto = skillService.buscarFoto(id);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-type", foto.getTipo());
		headers.add("Content-length", String.valueOf(foto.getDados().length));
		return new ResponseEntity<>(foto.getDados(), headers, HttpStatus.OK);
	}

}
