import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import Tag from '../tag/tag';
import './tags.css';
import IconPlus from '../../../public/icon-plus.svg';
import Image from 'next/image';

type ManageTagsProps = {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
};

function ManageTags({ tags, setTags }: ManageTagsProps) {
  const [newTag, setNewTag] = useState('');
  const handelTagRemove = (key: number) => {
    const _tect = tags && [...tags];
    _tect.splice(key, 1);
    setTags(_tect);
  };
  const handleAddNewTech = (e: FormEvent) => {
    e.preventDefault();
    setTags && setTags((prev) => prev && [...prev, newTag]);
    setNewTag('');
  };

  return (
    <div className="tags">
      {tags.length > 0 &&
        tags.map((item, index) => (
          <Tag
            key={index}
            onClick={() => handelTagRemove(index)}
            isIcon={true}
            color={'gray'}
            label={item}
          />
        ))}

      <input
        type="text"
        className="bodytext3 bodytext3_semibold tags__input"
        placeholder="add tech"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
      />
      <button type="submit" onClick={handleAddNewTech} className="tags__button">
        <Image src={IconPlus} alt="Plus" />
      </button>
    </div>
  );
}

export default ManageTags;
