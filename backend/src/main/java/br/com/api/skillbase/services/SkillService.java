package br.com.api.skillbase.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.com.api.skillbase.domains.Foto;
import br.com.api.skillbase.domains.Skill;
import br.com.api.skillbase.dtos.SkillDTO;
import br.com.api.skillbase.repositories.SkillRepository;
@Service
public class SkillService {

	@Autowired
	SkillRepository skillRepository;
	@Autowired
	FotoService fotoService;
	
	public List<Skill> listarTodas(){
		return skillRepository.findAll();
	}
	
	public Skill cadastrarSkill(SkillDTO skillDTO, MultipartFile file) {
		Foto foto = new Foto();
		Skill skill = new Skill();
		skill.setDescricao(skillDTO.getDescricao());
		skill.setNome(skillDTO.getNome());
		skillRepository.save(skill);
		skill.setImagemURL(fotoService.adicionarImagemURI(skill));
		skillRepository.save(skill);
		fotoService.cadastrarSkill(skill, foto, file);
		return skill;
	}

	public Foto buscarFoto(Long id) {
			Skill skill = skillRepository.findById(id)
					.orElseThrow();
			Foto foto = fotoService.findBySkill(skill)
					.orElseThrow();
			return foto;
	}
	
}
