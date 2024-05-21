package com.spe.project.travelguide.main.Agency;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AgencyRepository extends JpaRepository<AgencyEntity, Integer> {

    Optional<AgencyEntity> findByEmail(String email);

}
