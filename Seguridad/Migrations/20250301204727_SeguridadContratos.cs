using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Seguridad.Migrations
{
    /// <inheritdoc />
    public partial class SeguridadContratos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Empresa",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    nit = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Empresa", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Modulo",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    estado = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Modulo", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Rol",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    estado = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rol", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Troncal",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Troncal", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Permiso",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    rolId = table.Column<int>(type: "int", nullable: false),
                    moduloId = table.Column<int>(type: "int", nullable: false),
                    lectura = table.Column<bool>(type: "bit", nullable: false),
                    editar = table.Column<bool>(type: "bit", nullable: false),
                    consultar = table.Column<bool>(type: "bit", nullable: false),
                    insertar = table.Column<bool>(type: "bit", nullable: false),
                    eliminar = table.Column<bool>(type: "bit", nullable: false),
                    exportar = table.Column<bool>(type: "bit", nullable: false),
                    importar = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permiso", x => x.id);
                    table.ForeignKey(
                        name: "FK_Permiso_Modulo_moduloId",
                        column: x => x.moduloId,
                        principalTable: "Modulo",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Permiso_Rol_rolId",
                        column: x => x.rolId,
                        principalTable: "Rol",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    usuario = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    confirmPassword = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    nombres = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    apellidos = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    correo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    telefono = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    fechaCreacion = table.Column<DateTime>(type: "datetime2", nullable: true),
                    fechaExpiracion = table.Column<DateTime>(type: "datetime2", nullable: true),
                    empresaId = table.Column<int>(type: "int", nullable: false),
                    rolId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuario", x => x.id);
                    table.ForeignKey(
                        name: "FK_Usuario_Empresa_empresaId",
                        column: x => x.empresaId,
                        principalTable: "Empresa",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Usuario_Rol_rolId",
                        column: x => x.rolId,
                        principalTable: "Rol",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Contrato",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    numero = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    objeto = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    empresaId = table.Column<int>(type: "int", nullable: false),
                    usuarioAsignaId = table.Column<int>(type: "int", nullable: false),
                    usuarioContratistaId = table.Column<int>(type: "int", nullable: false),
                    valor = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    duracion = table.Column<int>(type: "int", nullable: false),
                    fechaInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fechaFin = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contrato", x => x.id);
                    table.ForeignKey(
                        name: "FK_Contrato_Empresa_empresaId",
                        column: x => x.empresaId,
                        principalTable: "Empresa",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Contrato_Usuario_usuarioAsignaId",
                        column: x => x.usuarioAsignaId,
                        principalTable: "Usuario",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Contrato_Usuario_usuarioContratistaId",
                        column: x => x.usuarioContratistaId,
                        principalTable: "Usuario",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Proyecto",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    liderId = table.Column<int>(type: "int", nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Proyecto", x => x.id);
                    table.ForeignKey(
                        name: "FK_Proyecto_Usuario_liderId",
                        column: x => x.liderId,
                        principalTable: "Usuario",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ActaContrato",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    contratoId = table.Column<int>(type: "int", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    documento = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActaContrato", x => x.id);
                    table.ForeignKey(
                        name: "FK_ActaContrato_Contrato_contratoId",
                        column: x => x.contratoId,
                        principalTable: "Contrato",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AmpliacionContrato",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    contratoId = table.Column<int>(type: "int", nullable: false),
                    fechaInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fechaFin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    valor = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    duracion = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AmpliacionContrato", x => x.id);
                    table.ForeignKey(
                        name: "FK_AmpliacionContrato_Contrato_contratoId",
                        column: x => x.contratoId,
                        principalTable: "Contrato",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ODS",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    valorInical = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    duracion = table.Column<int>(type: "int", nullable: false),
                    fechaInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fechaFin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fechaInicioSuspension = table.Column<DateTime>(type: "datetime2", nullable: true),
                    fechaFinSuspension = table.Column<DateTime>(type: "datetime2", nullable: true),
                    valorActual = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    estado = table.Column<int>(type: "int", nullable: false),
                    supervisorId = table.Column<int>(type: "int", nullable: false),
                    solicitanteId = table.Column<int>(type: "int", nullable: false),
                    recurso = table.Column<int>(type: "int", nullable: false),
                    plantaSistema = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    conexoObra = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    proyectoId = table.Column<int>(type: "int", nullable: false),
                    troncalId = table.Column<int>(type: "int", nullable: false),
                    contratoId = table.Column<int>(type: "int", nullable: false),
                    ampliacionContratoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ODS", x => x.id);
                    table.ForeignKey(
                        name: "FK_ODS_AmpliacionContrato_ampliacionContratoId",
                        column: x => x.ampliacionContratoId,
                        principalTable: "AmpliacionContrato",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ODS_Contrato_contratoId",
                        column: x => x.contratoId,
                        principalTable: "Contrato",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ODS_Proyecto_proyectoId",
                        column: x => x.proyectoId,
                        principalTable: "Proyecto",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ODS_Troncal_troncalId",
                        column: x => x.troncalId,
                        principalTable: "Troncal",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ODS_Usuario_solicitanteId",
                        column: x => x.solicitanteId,
                        principalTable: "Usuario",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ODS_Usuario_supervisorId",
                        column: x => x.supervisorId,
                        principalTable: "Usuario",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ActaODS",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    odsId = table.Column<int>(type: "int", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    documento = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActaODS", x => x.id);
                    table.ForeignKey(
                        name: "FK_ActaODS_ODS_odsId",
                        column: x => x.odsId,
                        principalTable: "ODS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrdenCambio",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    odsId = table.Column<int>(type: "int", nullable: false),
                    fechaInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fechaFin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    valor = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    duracion = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrdenCambio", x => x.id);
                    table.ForeignKey(
                        name: "FK_OrdenCambio_ODS_odsId",
                        column: x => x.odsId,
                        principalTable: "ODS",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActaContrato_contratoId",
                table: "ActaContrato",
                column: "contratoId");

            migrationBuilder.CreateIndex(
                name: "IX_ActaODS_odsId",
                table: "ActaODS",
                column: "odsId");

            migrationBuilder.CreateIndex(
                name: "IX_AmpliacionContrato_contratoId",
                table: "AmpliacionContrato",
                column: "contratoId");

            migrationBuilder.CreateIndex(
                name: "IX_Contrato_empresaId",
                table: "Contrato",
                column: "empresaId");

            migrationBuilder.CreateIndex(
                name: "IX_Contrato_usuarioAsignaId",
                table: "Contrato",
                column: "usuarioAsignaId");

            migrationBuilder.CreateIndex(
                name: "IX_Contrato_usuarioContratistaId",
                table: "Contrato",
                column: "usuarioContratistaId");

            migrationBuilder.CreateIndex(
                name: "IX_ODS_ampliacionContratoId",
                table: "ODS",
                column: "ampliacionContratoId");

            migrationBuilder.CreateIndex(
                name: "IX_ODS_contratoId",
                table: "ODS",
                column: "contratoId");

            migrationBuilder.CreateIndex(
                name: "IX_ODS_proyectoId",
                table: "ODS",
                column: "proyectoId");

            migrationBuilder.CreateIndex(
                name: "IX_ODS_solicitanteId",
                table: "ODS",
                column: "solicitanteId");

            migrationBuilder.CreateIndex(
                name: "IX_ODS_supervisorId",
                table: "ODS",
                column: "supervisorId");

            migrationBuilder.CreateIndex(
                name: "IX_ODS_troncalId",
                table: "ODS",
                column: "troncalId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdenCambio_odsId",
                table: "OrdenCambio",
                column: "odsId");

            migrationBuilder.CreateIndex(
                name: "IX_Permiso_moduloId",
                table: "Permiso",
                column: "moduloId");

            migrationBuilder.CreateIndex(
                name: "IX_Permiso_rolId",
                table: "Permiso",
                column: "rolId");

            migrationBuilder.CreateIndex(
                name: "IX_Proyecto_liderId",
                table: "Proyecto",
                column: "liderId");

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_empresaId",
                table: "Usuario",
                column: "empresaId");

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_rolId",
                table: "Usuario",
                column: "rolId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActaContrato");

            migrationBuilder.DropTable(
                name: "ActaODS");

            migrationBuilder.DropTable(
                name: "OrdenCambio");

            migrationBuilder.DropTable(
                name: "Permiso");

            migrationBuilder.DropTable(
                name: "ODS");

            migrationBuilder.DropTable(
                name: "Modulo");

            migrationBuilder.DropTable(
                name: "AmpliacionContrato");

            migrationBuilder.DropTable(
                name: "Proyecto");

            migrationBuilder.DropTable(
                name: "Troncal");

            migrationBuilder.DropTable(
                name: "Contrato");

            migrationBuilder.DropTable(
                name: "Usuario");

            migrationBuilder.DropTable(
                name: "Empresa");

            migrationBuilder.DropTable(
                name: "Rol");
        }
    }
}
