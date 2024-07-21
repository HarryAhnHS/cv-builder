import uuid from "react-uuid";
import {useState} from "react";

function Categories({onDataChange}) {

    // List of all entries
    const [categoriesList, setCategoriesList] = useState([]);

    // Create new entry - append a default entry into list's state
    function handleNewCategoryEntry() {
        // Add new entry in default state
        const updatedCategoriesList = [
            ...categoriesList, {
                categoryTitle: '',
                categoryItems: [],
                uuid: uuid(),
                visible: true
            }
        ]
        setCategoriesList(updatedCategoriesList);

        onDataChange("categories", updatedCategoriesList); // Propagate up to Content.jsx to make changes
    }

    function deleteCategoryEntry(uuidToDelete) {
        const updatedCategoriesList = [...categoriesList].filter((entry) => entry.uuid !== uuidToDelete);

        setCategoriesList(updatedCategoriesList);

        onDataChange("categories", updatedCategoriesList);
    }

    // Update any entry - make changes to local entry item and collective list -> then push updated list to onDataChange
    function handleInputChange(e, uuidToChange) {
        const {name, value} = e.target;
        // Local state update entry - find entry with uuid to change
        const updatedCategoriesEntry =  {
            ...[...categoriesList].find((entry) => (entry.uuid === uuidToChange)),
            [name]: value,
        };

        // Local state update based on updated entry
        const updatedCategoriesList = [...categoriesList].map(
            (entry) => (entry.uuid === uuidToChange) ? updatedCategoriesEntry : entry
        );

        setCategoriesList(updatedCategoriesList);

        onDataChange("categories", updatedCategoriesList); // Propagate up to Content.jsx to make changes
    }


    // Category - individual data
    function addToCategory(uuidToAdd) {
        const updatedCategoriesList = [...categoriesList].map((cat) => {
                if (cat.uuid === uuidToAdd) {
                    cat.categoryItems.push({
                        value: "",
                        uuid: uuid()
                    });
                }
                return cat;
            })

        setCategoriesList(updatedCategoriesList);

        onDataChange("categories", updatedCategoriesList);
    }

    function handleCategoryItemChange(e, uuidCategory, uuidItemToChange) {
        const updatedCategoriesList = [...categoriesList].map((cat) => {
            if (cat.uuid === uuidCategory) {
                cat.categoryItems.map((item) => {
                    item.value = (item.uuid === uuidItemToChange) ? e.target.value : item.value;
                })
            }
            return cat;
        })

        setCategoriesList(updatedCategoriesList);

        onDataChange("categories", updatedCategoriesList);
    }

    function deleteCategoryItem(uuidCategory, uuidItemToDelete) {
        const updatedCategoriesList = [...categoriesList].map((cat) => {
            if (cat.uuid === uuidCategory) {
                cat.categoryItems = cat.categoryItems.filter((item) => item.uuid !== uuidItemToDelete);
            }
            return cat;
        })

        setCategoriesList(updatedCategoriesList);

        onDataChange("categories", updatedCategoriesList);
    }

    return (
        <>
            {categoriesList.length > 0 && 
            categoriesList.map((entry) => {
                return (
                <div className="categoryField" key={entry.uuid}>
                    <label htmlFor="categoryTitle">
                        <input
                            name = "categoryTitle"
                            type = "text"
                            value = {entry.categoryTitle}
                            onChange = {(e) => handleInputChange(e, entry.uuid)}
                        />
                    </label>

                    {entry.categoryItems.map((item) => {
                        return <div className="category-item" key={item.uuid}>
                            <input
                                name="personalJob"
                                type="text"
                                value = {item.value}
                                onChange = {(e) => handleCategoryItemChange(e, entry.uuid, item.uuid)}
                            />
                            <button id="delete-category-item" onClick={() => deleteCategoryItem(entry.uuid, item.uuid)}>Delete Item</button>
                        </div>
                    })}

                    <button id="edit-category" onClick={() => addToCategory(entry.uuid)}>
                        Add Item to {entry.categoryTitle}
                    </button>
                    <button id="delete-entry" onClick={() => deleteCategoryEntry(entry.uuid)}>
                        Delete category
                    </button>
                </div>
                )
            })}

            <button id="new-entry" onClick={handleNewCategoryEntry}>
                New Category
            </button>
        </>
    )
}

export default Categories;