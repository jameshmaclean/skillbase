package br.com.api.skillbase.dtos;

public class UserSkillResponseDTO {
	private String usuario;
	private String nomeSkill;
	private String descricaoSkill;
	private Long idSkill;
	private Long idAssociacao;
	private Integer levelSkill;
	private String imagemURL;
	
	public UserSkillResponseDTO() {
		
	}
	public UserSkillResponseDTO(String usuario, String nomeSkill, String descricaoSkill, Integer levelSkill, String imagemURL, Long idSkill, Long idAssociacao) {
		this.usuario = usuario;
		this.nomeSkill = nomeSkill;
		this.descricaoSkill = descricaoSkill;
		this.levelSkill = levelSkill;
		this.imagemURL = imagemURL;
		this.idSkill = idSkill;
		this.idAssociacao = idAssociacao;
	}
	public String getUsuario() {
		return usuario;
	}
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	public String getNomeSkill() {
		return nomeSkill;
	}
	public void setNomeSkill(String nomeSkill) {
		this.nomeSkill = nomeSkill;
	}
	public String getDescricaoSkill() {
		return descricaoSkill;
	}
	public void setDescricaoSkill(String descricaoSkill) {
		this.descricaoSkill = descricaoSkill;
	}
	public Integer getLevelSkill() {
		return levelSkill;
	}
	public void setLevelSkill(Integer levelSkil) {
		this.levelSkill = levelSkil;
	}
	
	public Long getIdSkill() {
		return idSkill;
	}
	public void setIdSkill(Long idSkill) {
		this.idSkill = idSkill;
	}
	public String getImagemURL() {
		return imagemURL;
	}
	public void setImagemURL(String imagemURL) {
		this.imagemURL = imagemURL;
	}
	public Long getIdAssociacao() {
		return idAssociacao;
	}
	public void setIdAssociacao(Long idAssociacao) {
		this.idAssociacao = idAssociacao;
	}
	
}
