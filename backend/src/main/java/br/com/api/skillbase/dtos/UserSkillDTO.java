package br.com.api.skillbase.dtos;

public class UserSkillDTO {
	private Long idUsuario;
	private Long idSkill;
	private Integer level;
	
	public UserSkillDTO(Long idUsuario, Long idSkill, Integer level) {
		this.idUsuario = idUsuario;
		this.idSkill = idSkill;
		this.level = level;
	}
	public UserSkillDTO() {
		
	}
	public Long getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}
	public Long getIdSkill() {
		return idSkill;
	}
	public void setIdSkill(Long idSkill) {
		this.idSkill = idSkill;
	}
	public Integer getLevel() {
		return level;
	}
	public void setLevel(Integer level) {
		this.level = level;
	}


}
