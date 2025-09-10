package cz.nastrih.repository;

import cz.nastrih.entity.Booking;
import cz.nastrih.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {
    List<Booking> findByStaff_IdAndDate(UUID staffId, LocalDate date);

    @Query("SELECT b FROM Booking b WHERE b.staff.id = :staffId AND b.date = :date AND NOT (b.endTime <= :start OR b.startTime >= :end)")
    List<Booking> findOverlapping(@Param("staffId") UUID staffId,
                                  @Param("date") LocalDate date,
                                  @Param("start") LocalTime start,
                                  @Param("end") LocalTime end);

    @Query("SELECT b FROM Booking b WHERE b.staff.id = :staffId AND b.date = :date AND b.status IN :statuses AND NOT (b.endTime <= :start OR b.startTime >= :end)")
    List<Booking> findOverlappingActive(@Param("staffId") UUID staffId,
                                        @Param("date") LocalDate date,
                                        @Param("start") LocalTime start,
                                        @Param("end") LocalTime end,
                                        @Param("statuses") List<BookingStatus> statuses);
}
