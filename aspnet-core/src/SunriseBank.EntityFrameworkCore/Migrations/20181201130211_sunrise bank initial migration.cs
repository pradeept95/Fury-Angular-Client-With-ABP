using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SunriseBank.Migrations
{
    public partial class sunrisebankinitialmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "m_activity_log",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    UserId = table.Column<long>(nullable: false),
                    Action = table.Column<string>(nullable: true),
                    Remarks = table.Column<string>(nullable: true),
                    Timestamp = table.Column<DateTime>(nullable: false),
                    RequestContent = table.Column<string>(nullable: true),
                    ResponseContent = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_m_activity_log", x => x.Id);
                    table.ForeignKey(
                        name: "FK_m_activity_log_AbpUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "m_application_user",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    UserId = table.Column<long>(nullable: false),
                    FirstName = table.Column<string>(nullable: false),
                    MiddleName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: false),
                    PrimaryMobileNumber = table.Column<string>(nullable: false),
                    SecondaryMobileNumber = table.Column<string>(nullable: true),
                    PrimaryEmailAddress = table.Column<string>(nullable: false),
                    SecondaryEmailAddress = table.Column<string>(nullable: true),
                    Address1 = table.Column<string>(nullable: true),
                    Address2 = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    IsSuspended = table.Column<bool>(nullable: false),
                    IsVerified = table.Column<bool>(nullable: false),
                    IsPasswordCreated = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_m_application_user", x => x.Id);
                    table.ForeignKey(
                        name: "FK_m_application_user_AbpUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "m_application_user_documents",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    UserId = table.Column<long>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Note = table.Column<string>(nullable: true),
                    DocumentPath = table.Column<string>(nullable: true),
                    IsActive = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_m_application_user_documents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_m_application_user_documents_AbpUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "m_application_user_password_history",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    UserId = table.Column<long>(nullable: false),
                    HashPassword = table.Column<string>(nullable: true),
                    ExpiryDate = table.Column<DateTime>(nullable: false),
                    IsActivePassword = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_m_application_user_password_history", x => x.Id);
                    table.ForeignKey(
                        name: "FK_m_application_user_password_history_AbpUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "m_global_configuration",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    Key = table.Column<string>(nullable: true),
                    DisplayName = table.Column<string>(nullable: true),
                    Type = table.Column<int>(nullable: false),
                    ConfigurationValue = table.Column<string>(nullable: true),
                    OrderNumber = table.Column<int>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    IsStatic = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_m_global_configuration", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "m_global_configuration_detail",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    GlobalConfigurationId = table.Column<Guid>(nullable: false),
                    Label = table.Column<string>(nullable: true),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_m_global_configuration_detail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_m_global_configuration_detail_m_global_configuration_GlobalConfigurationId",
                        column: x => x.GlobalConfigurationId,
                        principalTable: "m_global_configuration",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_m_activity_log_UserId",
                table: "m_activity_log",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_m_application_user_UserId",
                table: "m_application_user",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_m_application_user_documents_UserId",
                table: "m_application_user_documents",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_m_application_user_password_history_UserId",
                table: "m_application_user_password_history",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_m_global_configuration_detail_GlobalConfigurationId",
                table: "m_global_configuration_detail",
                column: "GlobalConfigurationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "m_activity_log");

            migrationBuilder.DropTable(
                name: "m_application_user");

            migrationBuilder.DropTable(
                name: "m_application_user_documents");

            migrationBuilder.DropTable(
                name: "m_application_user_password_history");

            migrationBuilder.DropTable(
                name: "m_global_configuration_detail");

            migrationBuilder.DropTable(
                name: "m_global_configuration");
        }
    }
}
