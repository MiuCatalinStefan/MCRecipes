using MC_Api.Models;
using Microsoft.EntityFrameworkCore;

namespace MC_Api.Data
{
    public class MC_ApiContext : DbContext
    {
        public MC_ApiContext(DbContextOptions<MC_ApiContext> options) : base(options){ }

        public DbSet<Recipe> Recipes { get; set; }

        public DbSet<Ingredient> Ingredients { get; set; }

        public DbSet<Tag> Tags {get; set;}

        public DbSet<Step> Steps { get; set; }

        public DbSet<Spice> Spices { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<User> Users { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>{entity.HasIndex(e => e.Email).IsUnique(); });
        }
    }
}