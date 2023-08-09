package br.com.api.skillbase.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.api.skillbase.domains.UserSkill;
import br.com.api.skillbase.security.domains.User;

public interface UserSkillRepository extends JpaRepository<UserSkill, Long> {

    List<UserSkill> findByUsuario(User usuario);

}
