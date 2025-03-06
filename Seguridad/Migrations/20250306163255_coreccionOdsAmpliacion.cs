using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Seguridad.Migrations
{
    /// <inheritdoc />
    public partial class coreccionOdsAmpliacion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ampliacionContratoId",
                table: "ODS",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ampliacionContratoId",
                table: "ODS",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
