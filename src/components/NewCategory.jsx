import uuid from "react-uuid";
import {useState} from "react";

function NewCategory({entry, categoriesList, setCategoriesList, onDataChange}) {

    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({});

    // Category Items
    function addCategoryItem() {
        // Create default category item with attributes based on selected category's configuration 
        let defaultCategoryItem = {
            uuid: uuid(),
        };
        Object.keys(entry.categoryInputTypes).forEach((type) => {
            if (entry.categoryInputTypes[type].exists) {
                defaultCategoryItem[type] =  "";
            }
        })

        // Update state of category list with new default categoryitem
        const updatedCategoriesList = [...categoriesList].map((category) => {
            return category.uuid === entry.uuid 
            ? {
                ...category, 
                categoryItems: [...category.categoryItems, defaultCategoryItem]
            }
            : category
        })

        setCategoriesList(updatedCategoriesList);
        onDataChange("categories", updatedCategoriesList);

        setFormData(defaultCategoryItem);
        setEditId(defaultCategoryItem.uuid);
    }

    function handleEditCategoryItem(e,uuidItemToEdit) {
        const itemToEdit = entry.categoryItems.find((item) => item.uuid === uuidItemToEdit);

        console.log(itemToEdit);
        console.log(uuidItemToEdit);
        setFormData(itemToEdit);
        setEditId(uuidItemToEdit);
    }

    function handleDeleteCategoryItem(e, uuidItemToDelete) {
        const updatedCategory = {
            ...entry,
            categoryItems: [...entry.categoryItems].filter((item) => item.uuid !== uuidItemToDelete)
        }

        const updatedCategoriesList = [...categoriesList].map((category) => {
            return category.uuid === entry.uuid ? updatedCategory : category;
        })

        setCategoriesList(updatedCategoriesList);
        onDataChange("categories", updatedCategoriesList);
    }


    // Form Stuff
    function handleCategoryItemChange(e) {
        const {name, value} = e.target;
        const updatedCategoryItem = {
            ...formData,
            [name]: value

        }

        setFormData(updatedCategoryItem) 
    }

    function handleCancel() {
        setEditId(null);
        setFormData({});
    }

    function handleSave() {
        const updatedCategoryItems = 
            [...categoriesList.find((category) => category.uuid === entry.uuid).categoryItems].map((item) => {
                return item.uuid === editId ? formData : item;
        })

        const updatedCategoriesList = categoriesList.map((category) => {
            return category.uuid === entry.uuid 
            ? {
                ...category,
                categoryItems: updatedCategoryItems
            }
            : category;
        })

        setCategoriesList(updatedCategoriesList);
        onDataChange("categories", updatedCategoriesList);
        
        setEditId(null);
        setFormData({});
    }

    console.log("NewCategory formData", formData);


    return(
            <>
                {editId 
                ?
                    // Edit Mode
                    <div className="form new-category">
                        <div className="form-inputs new-category">
                            {Object.keys(entry.categoryInputTypes).map((key, index) => {
                                return entry.categoryInputTypes[key].exists 
                                ?
                                    <label key={index} htmlFor={key}>{key}
                                        <input
                                            name={key}
                                            type={entry.categoryInputTypes[key].inputType}
                                            value={formData[key]}
                                            onChange = {(e) => handleCategoryItemChange(e)}
                                        />
                                    </label>
                                :
                                    null
                                })
                            }
                        </div>

                        <div className="form-controls new-category">
                            <button id="cancel" onClick={handleCancel}>Cancel</button>
                            <button id="save" onClick={handleSave}>Save</button>
                        </div>
                    </div>
                :
                    // Display Mode
                    <div className="list new-category">
                        <h2 className="loader-title">
                        {entry.categoryTitle != "" ? entry.categoryTitle : "Unnamed Category"}
                        </h2>

                        {entry.categoryItems.map((item) => {
                        return (
                                <div className="entry category-item" key={item.uuid}>
                                    <div className="entry-summary category-item">
                                        {item.Title}
                                    </div>
                                    <div className="entry-controls category-item">
                                        <button id="item-edit" onClick={(e) => handleEditCategoryItem(e, item.uuid)}>Edit</button>
                                        <button id="item-delete" onClick={(e) => handleDeleteCategoryItem(e, item.uuid)}>Delete</button>
                                    </div>
                                </div>
                        )
                        })}
                        <button id="add-category-item" onClick={addCategoryItem}>
                            Add Item
                        </button>
                    </div>
                }
            </>
        )
}

export default NewCategory;