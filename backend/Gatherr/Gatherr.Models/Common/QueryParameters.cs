
namespace Gatherr.Models.Common
{
    public class GroupsQueryParameters
    {
        private const int maxPageCount = 20;
        public int Page { get; set; } = 1;

        private int _pageCount = maxPageCount;
        public int PageCount
        {
            get { return _pageCount; }
            set { _pageCount = (value > maxPageCount) ? maxPageCount : value; }
        }
        
        public string Categories { get; set; }
        public string Query { get; set; }
    }
}