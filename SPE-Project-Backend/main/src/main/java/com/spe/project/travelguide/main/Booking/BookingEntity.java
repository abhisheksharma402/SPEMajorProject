package com.spe.project.travelguide.main.Booking;

import com.spe.project.travelguide.main.Package.PackageEntity;
import com.spe.project.travelguide.main.Payment.PaymentEntity;
import com.spe.project.travelguide.main.User.UserEntity;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="booking")
public class BookingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name="package_id")
    private PackageEntity packageEntity;

    @ManyToOne
    @JoinColumn(name="user_id")
    private UserEntity user;

    @OneToOne
    @JoinColumn(name = "payment_id")
    private PaymentEntity payment;


}
