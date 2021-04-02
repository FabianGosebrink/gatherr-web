using System;

namespace Gatherr.Models.Entities
{
    public class GroupCategoryEntity
    {
        public Guid GroupId { get; set; }
        public GroupEntity Group { get; set; }

        public Guid CategoryId { get; set; }
        public CategoryEntity Category { get; set; }
    }

    //public class Book
    //{
    //    public int BookId { get; set; }
    //    public string Title { get; set; }
    //    public Author Author { get; set; }
    //    public ICollection<BookCategory> BookCategories { get; set; }
    //}
    //public class Category
    //{
    //    public int CategoryId { get; set; }
    //    public string CategoryName { get; set; }
    //    public ICollection<BookCategory> BookCategories { get; set; }
    //}
    //public class BookCategory
    //{
    //    public int BookId { get; set; }
    //    public Book Book { get; set; }
    //    public int CategoryId { get; set; }
    //    public Category Category { get; set; }
    //}
}
