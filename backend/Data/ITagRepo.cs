using System.Collections.Generic;
using MC_Api.Models;

namespace MC_Api.Data
{
    public interface ITagRepo
    {
        IEnumerable<Tag> GetAllTags();

        Tag GetTagByID(int id);

        void CreateTag(Tag tag);

        bool SaveChanges();

        void UpdateTag(Tag tag);

        void DeleteTag(Tag tag);
    }
}