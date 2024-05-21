package com.spe.project.travelguide.main.Agent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AgentRepository extends JpaRepository<AgentEntity, Integer> {
    Optional<AgentEntity> findByEmail(String email);
}
