package com.spe.project.travelguide.main.Agency;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.spe.project.travelguide.main.Agent.AgentEntity;
import com.spe.project.travelguide.main.Package.PackageEntity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="agency")
public class AgencyEntity implements UserDetails, Principal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    @Column(nullable = false)
    private Long phoneNumber;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String licenseNumber;

    @Column(nullable = false)
    private Boolean isVerified;

    @Column(nullable = false)
    private String emailDomain;

    @OneToMany(mappedBy = "agency", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<PackageEntity> packages;

    @OneToMany(mappedBy = "agency", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<AgentEntity> agents;

    private String activationToken;

    private LocalDateTime tokenCreationTime;

    private LocalDateTime verifiedAt;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return new HashSet<GrantedAuthority>();
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isVerified;
    }


}
