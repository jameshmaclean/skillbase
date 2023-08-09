package br.com.api.skillbase.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.api.skillbase.domains.Skill;
import br.com.api.skillbase.domains.UserSkill;
import br.com.api.skillbase.dtos.UserSkillDTO;
import br.com.api.skillbase.dtos.UserSkillResponseDTO;
import br.com.api.skillbase.repositories.SkillRepository;
import br.com.api.skillbase.repositories.UserSkillRepository;
import br.com.api.skillbase.security.domains.User;
import br.com.api.skillbase.security.repositories.UserRepository;

@Service
public class UserSkillService {
	@Autowired 
	UserSkillRepository userSkillRepository;
	@Autowired 
	UserRepository userRepository;
	@Autowired
	SkillRepository skillRepository;
	
	public List<UserSkillResponseDTO> listarSkillsUsuario(Long id){
		User user = userRepository.findById(id)
				.orElseThrow(() -> new UsernameNotFoundException("Usuario não encontrado com o ID: " + id));
		List<UserSkillResponseDTO> listaResponse = new ArrayList<>();
		List <UserSkill> lista = userSkillRepository.findByUsuario(user);
		for(UserSkill associacao : lista) {
			UserSkillResponseDTO associacaoDTO = new UserSkillResponseDTO();
			associacaoDTO.setDescricaoSkill(associacao.getSkill().getDescricao());
			associacaoDTO.setIdSkill(associacao.getSkill().getIdSkill());
			associacaoDTO.setLevelSkill(associacao.getLevel());
			associacaoDTO.setIdAssociacao(associacao.getIdUserSkill());
			associacaoDTO.setNomeSkill(associacao.getSkill().getNome());
			associacaoDTO.setUsuario(associacao.getUsuario().getUsername());
			associacaoDTO.setImagemURL(associacao.getSkill().getImagemURL());
			listaResponse.add(associacaoDTO);
		}
		return listaResponse;
	}
	
	public UserSkillResponseDTO associarSkill(UserSkillDTO userSkillDTO) {
		UserSkill userSkill = new UserSkill();
		userSkill.setLevel(userSkillDTO.getLevel());
		User user = userRepository.findById(userSkillDTO.getIdUsuario())
				.orElseThrow(() -> new UsernameNotFoundException("Usuario não encontrado com o ID: " + userSkillDTO.getIdUsuario()));
		userSkill.setUsuario(user);
		Skill skill = skillRepository.findById(userSkillDTO.getIdSkill())
				.orElseThrow();
		userSkill.setSkill(skill);
		Long idAssociacao = userSkillRepository.save(userSkill).getIdUserSkill();
		UserSkillResponseDTO responseDTO = new UserSkillResponseDTO();
		responseDTO.setDescricaoSkill(skill.getDescricao());
		responseDTO.setLevelSkill(userSkill.getLevel());
		responseDTO.setIdSkill(skill.getIdSkill());
		responseDTO.setNomeSkill(skill.getNome());
		responseDTO.setUsuario(user.getUsername());
		responseDTO.setIdAssociacao(idAssociacao);
		responseDTO.setImagemURL(skill.getImagemURL());
		return responseDTO;
	}
	
	public UserSkillResponseDTO editarAssociacao(Long idAssociacao, UserSkillDTO userSkillDTO) {
		UserSkill userSkill = userSkillRepository.findById(idAssociacao)
				.orElseThrow();
		userSkill.setLevel(userSkillDTO.getLevel());
		UserSkillResponseDTO responseDTO = new UserSkillResponseDTO();
		responseDTO.setDescricaoSkill(userSkill.getSkill().getDescricao());
		responseDTO.setIdSkill(userSkill.getSkill().getIdSkill());
		responseDTO.setLevelSkill(userSkill.getLevel());
		responseDTO.setNomeSkill(userSkill.getSkill().getNome());
		responseDTO.setUsuario(userSkill.getUsuario().getUsername());
		responseDTO.setImagemURL(userSkill.getSkill().getImagemURL());
		responseDTO.setIdAssociacao(userSkill.getIdUserSkill());
		userSkillRepository.save(userSkill);
		return responseDTO;
	}
	
	public String deletarAssociacao(Long idAssociacao) {
		UserSkill userSkill = userSkillRepository.findById(idAssociacao)
				.orElseThrow();
		userSkillRepository.delete(userSkill);
		return "Associação deletada";
	}

}
