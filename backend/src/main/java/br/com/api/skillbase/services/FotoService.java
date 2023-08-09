package br.com.api.skillbase.services;

import java.io.IOException;
import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.api.skillbase.domains.Foto;
import br.com.api.skillbase.domains.Skill;
import br.com.api.skillbase.repositories.FotoRepository;



@Service
public class FotoService {
	@Autowired
	FotoRepository fotoRepository;


	public Foto pesquisar(Long id) {
		return fotoRepository.findById(id).get();
	}
	
	public Foto cadastrarSkill(Skill skill,Foto foto,MultipartFile file) {
		try {
			foto.setDados(file.getBytes());
			foto.setNome(file.getOriginalFilename());
			foto.setTipo(file.getContentType());
			foto.setSkill(skill);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return fotoRepository.save(foto);
	} 
	
	public String adicionarImagemURI(Skill skill) {
		URI uri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/skills/foto/{id}")
				.buildAndExpand(skill.getIdSkill()).toUri();
		skill.setImagemURL(uri.toString());
		return skill.getImagemURL();
	}

	public Optional<Foto> findBySkill(Skill skill) {
		return fotoRepository.findBySkill(skill);
	}

}
