﻿// <auto-generated />
using System;
using GGS.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GGS.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.9");

            modelBuilder.Entity("GGS.Entities.Location", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<float>("Latitude")
                        .HasColumnType("REAL");

                    b.Property<float>("Longitude")
                        .HasColumnType("REAL");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("GGS.Entities.LocationPhoto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsMain")
                        .HasColumnType("INTEGER");

                    b.Property<int>("LocationId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("PublicId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Url")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("LocationId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("GGS.Entities.LocationUnit", b =>
                {
                    b.Property<int>("LocationId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("UnitId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Created")
                        .HasColumnType("TEXT");

                    b.HasKey("LocationId", "UnitId");

                    b.HasIndex("UnitId");

                    b.ToTable("LocationUnit");
                });

            modelBuilder.Entity("GGS.Entities.Unit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Code")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Units");
                });

            modelBuilder.Entity("GGS.Entities.LocationPhoto", b =>
                {
                    b.HasOne("GGS.Entities.Location", "Location")
                        .WithMany("Photos")
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Location");
                });

            modelBuilder.Entity("GGS.Entities.LocationUnit", b =>
                {
                    b.HasOne("GGS.Entities.Location", "Location")
                        .WithMany("Units")
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GGS.Entities.Unit", "Unit")
                        .WithMany("Locations")
                        .HasForeignKey("UnitId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Location");

                    b.Navigation("Unit");
                });

            modelBuilder.Entity("GGS.Entities.Location", b =>
                {
                    b.Navigation("Photos");

                    b.Navigation("Units");
                });

            modelBuilder.Entity("GGS.Entities.Unit", b =>
                {
                    b.Navigation("Locations");
                });
#pragma warning restore 612, 618
        }
    }
}
