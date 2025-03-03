using Microsoft.EntityFrameworkCore;
using Seguridad.Models.Contratos;
using Seguridad.Models.Seguridad;

namespace Seguridad.Models
{
    public class IngenieriaContext : DbContext
    {
        public IngenieriaContext(DbContextOptions<IngenieriaContext> options) : base(options)
        {
        }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Rol> Rol { get; set; }
        public DbSet<Modulo> Modulo { get; set; }
        public DbSet<Permiso> Permiso { get; set; }
        public DbSet<Empresa> Empresa { get; set; }
        public DbSet<Proyecto> Proyecto { get; set; }
        public DbSet<Troncal> Troncal { get; set; }
        public DbSet<Contrato> Contrato { get; set; }
        public DbSet<AmpliacionContrato> AmpliacionContrato { get; set; }
        public DbSet<ActaContrato> ActaContrato { get; set; }
        public DbSet<ODS> ODS { get; set; }
        public DbSet<OrdenCambio> OrdenCambio { get; set; }
        public DbSet<ActaODS> ActaODS { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Usuario>()
               .HasOne(u => u.rolUsuarioFk)
               .WithMany()
               .HasForeignKey(u => u.rolId)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Usuario>()
               .HasOne(u => u.empresaUsuarioFk)
               .WithMany()
               .HasForeignKey(u => u.empresaId)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Permiso>()
                .HasOne(p => p.rolPermisoFk)
                .WithMany()
                .HasForeignKey(p => p.rolId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Permiso>()
                .HasOne(p => p.moduloPermisoFk)
                .WithMany()
                .HasForeignKey(p => p.moduloId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Proyecto>()
               .HasOne(p => p.liderProyectoFk)
               .WithMany()
               .HasForeignKey(p => p.liderId)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Contrato>()
             .HasOne(c => c.empresaContratoFk)
             .WithMany()
             .HasForeignKey(c => c.empresaId)
             .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Contrato>()
             .HasOne(c => c.usuarioAsignaConFk)
             .WithMany()
             .HasForeignKey(c => c.usuarioAsignaId)
             .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Contrato>()
             .HasOne(c => c.usuarioContratistaFk)
             .WithMany()
             .HasForeignKey(c => c.usuarioContratistaId)
             .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ActaContrato>()
             .HasOne(ac => ac.actaContratoFk)
             .WithMany()
             .HasForeignKey(ac => ac.contratoId)
             .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<AmpliacionContrato>()
             .HasOne(am => am.contratoAmpliacionFk)
             .WithMany()
             .HasForeignKey(am => am.contratoId)
             .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<AmpliacionContrato>()
             .HasOne(am => am.contratoAmpliacionFk)
             .WithMany()
             .HasForeignKey(am => am.contratoId)
             .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ODS>()
             .HasOne(ods => ods.supervisorODSFk)
             .WithMany()
             .HasForeignKey(ods => ods.supervisorId)
             .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ODS>()
             .HasOne(ods => ods.solicitanteODSFk)
             .WithMany()
             .HasForeignKey(ods => ods.solicitanteId)
             .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ODS>()
             .HasOne(ods => ods.proyectoODSFk)
             .WithMany()
             .HasForeignKey(ods => ods.proyectoId)
             .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ODS>()
            .HasOne(ods => ods.troncalODSFk)
            .WithMany()
            .HasForeignKey(ods => ods.troncalId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ODS>()
            .HasOne(ods => ods.contratoODSFk)
            .WithMany()
            .HasForeignKey(ods => ods.contratoId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ODS>()
              .HasOne(ods => ods.ampliacionConODSFk)
              .WithMany()
              .HasForeignKey(ods => ods.ampliacionContratoId)
              .OnDelete(DeleteBehavior.Restrict);

        }

    }
}
