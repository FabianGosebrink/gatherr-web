using Gatherr.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Gatherr.Data.Context
{
    public class GatherrDbContext : DbContext
    {
        public GatherrDbContext(DbContextOptions<GatherrDbContext> options)
           : base(options)
        {

        }

        public DbSet<MeetupEntity> Meetups { get; set; }
        public DbSet<GroupEntity> Groups { get; set; }
        public DbSet<CategoryEntity> Categories { get; set; }
        public DbSet<UserProfileEntity> UserProfiles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GroupCategoryEntity>()
                .HasKey(bc => new { bc.GroupId, bc.CategoryId });

            modelBuilder.Entity<GroupCategoryEntity>()
                .HasOne(bc => bc.Group)
                .WithMany(b => b.GroupCategories)
                .HasForeignKey(bc => bc.GroupId);

            modelBuilder.Entity<GroupCategoryEntity>()
                .HasOne(bc => bc.Category)
                .WithMany(c => c.GroupCategories)
                .HasForeignKey(bc => bc.CategoryId);



            modelBuilder.Entity<GroupMemberEntity>()
               .HasKey(bc => new { bc.GroupId, bc.UserProfileId });

            modelBuilder.Entity<GroupMemberEntity>()
                .HasOne(bc => bc.Group)
                .WithMany(b => b.GroupMembers)
                .HasForeignKey(bc => bc.GroupId);

            modelBuilder.Entity<GroupMemberEntity>()
                .HasOne(bc => bc.UserProfile)
                .WithMany(c => c.Groups)
                .HasForeignKey(bc => bc.UserProfileId);



            modelBuilder.Entity <MeetupMemberEntity>()
               .HasKey(bc => new { bc.MeetupId, bc.UserProfileId });

            modelBuilder.Entity<MeetupMemberEntity>()
                .HasOne(bc => bc.Meetup)
                .WithMany(b => b.Attendees)
                .HasForeignKey(bc => bc.MeetupId);

            modelBuilder.Entity<MeetupMemberEntity>()
                .HasOne(bc => bc.UserProfile)
                .WithMany(c => c.Meetups)
                .HasForeignKey(bc => bc.UserProfileId);
        }
    }
}
