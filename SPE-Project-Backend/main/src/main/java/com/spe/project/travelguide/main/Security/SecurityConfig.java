package com.spe.project.travelguide.main.Security;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor // creates constructors for private or final fields
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {

    private final JwtFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .cors(withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req->req
                                .requestMatchers("/actuator/**").permitAll()
                                .requestMatchers("/user/login").permitAll()
                                .requestMatchers("/user/register").permitAll()
                                .requestMatchers("/agency/login").permitAll()
                                .requestMatchers("/agency/register").permitAll()
                                .requestMatchers("/agent/login").permitAll()
                                .requestMatchers("/agent/register").permitAll()
                                .requestMatchers("/agent/activate-account").permitAll()
                                .requestMatchers("/agency/activate-account").permitAll()
                                .requestMatchers("/user/activate-account").permitAll()
                                .requestMatchers("/user/hello").permitAll()
                                .requestMatchers("/agency/makePackage").permitAll()
                                .requestMatchers("/agency/agents").permitAll()
                                .requestMatchers("/**").fullyAuthenticated()
                        )
                .sessionManagement(session-> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
