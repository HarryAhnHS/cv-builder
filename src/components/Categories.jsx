import uuid from "react-uuid";
import {useState} from "react";

function Categories({onDataChange}) {

    const [editId, setEditId] = useState(null); // ID of the currently edited category
    const [categoriesList, setCategoriesList] = useState([]); // List of all categories
    const [formData, setFormData] = useState({}); // Temporary state for the form being edited
    
    // Create new entry - append a default entry into list's state
    function handleNewCategoryEntry() {
        const defaultCategory = {
            categoryTitle: '',
            categoryItems: [],
            uuid: uuid(),
        }
        // // Add new entry in default state
        const updatedCategoriesList = [
            ...categoriesList,
            defaultCategory
        ]

        setCategoriesList(updatedCategoriesList);
        onDataChange("categories", updatedCategoriesList); // Propagate up to Content.jsx to make changes

        setEditId(defaultCategory.uuid);
        setFormData(defaultCategory);
    }

    function deleteCategoryEntry(uuidToDelete) {
        const updatedCategoriesList = [...categoriesList].filter((entry) => entry.uuid !== uuidToDelete);

        setCategoriesList(updatedCategoriesList);
        onDataChange("categories", updatedCategoriesList);
    }

    function handleEditCategoryEntry(uuidCategoryToEdit) {
        const categoryToEdit = categoriesList.find((entry) => entry.uuid === uuidCategoryToEdit);

        setFormData(categoryToEdit);
        setEditId(uuidCategoryToEdit);
    }

    // FORM STUFF
    // Change formData state based on input -> don't push changes to List or above until 'saved'
    function handleInputChange(e) {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    function addCategoryItem() {
        const updatedCategoryItems = [...formData.categoryItems, {
            value: "",
            uuid: uuid()
        }];

        setFormData({
            ...formData,
            categoryItems: updatedCategoryItems,
        })   
    }

    function handleCategoryItemChange(e, uuidItemToChange) {
        const updatedCategoryItems = [...formData.categoryItems].map((item) => {
            if (item.uuid === uuidItemToChange) {
                item = {...item, value : e.target.value};
            }
            return item;
        })

        setFormData({
            ...formData,
            categoryItems: updatedCategoryItems,
        }) 
    }

    function deleteCategoryItem(uuidItemToDelete) {
        const updatedCategoryItems = [...formData.categoryItems].filter((item) => item.uuid !== uuidItemToDelete);

        setFormData({
            ...formData,
            categoryItems: updatedCategoryItems,
        }) 
    }

    function handleCancel() {
        setEditId(null);
        setFormData({});
    }

    function handleSave() {
        const updatedCategoriesList = [...categoriesList].map((cat) => {
                return cat.uuid === editId ? formData : cat
            })

        setCategoriesList(updatedCategoriesList);
        onDataChange("categories", updatedCategoriesList);
        
        setEditId(null);
        setFormData({});
    }
    console.log("CategoriesList:")
    console.log(categoriesList);
    console.log("FormData:")
    console.log(formData);

    return (
        <>
            {editId ? 
                // Edit Mode
                <div>
                    <label htmlFor="categoryTitle">
                        <input
                            name = "categoryTitle"
                            type = "text"
                            value = {formData.categoryTitle}
                            onChange = {(e) => handleInputChange(e)}
                        />
                    </label>
                    <button id="edit-category" onClick={addCategoryItem}>
                            Add Item to {formData.categoryTitle}
                    </button>

                    {formData.categoryItems.map((item) => {
                        return (<div className="category-item" key={item.uuid}>
                            <input
                                name="personalJob"
                                type="text"
                                value = {item.value}
                                onChange = {(e) => handleCategoryItemChange(e, item.uuid)}
                            />
                            <button id="delete-category-item" onClick={() => deleteCategoryItem(item.uuid)}>Delete Item</button>
                        </div>)
                    })}

                    <button id="cancel" onClick={handleCancel}>Cancel</button>
                    <button id="save" onClick={handleSave}>Save</button>
                </div>
            
            : 
                // Display Mode
                <div>
                    {categoriesList.map((entry) => {
                        return (
                        <div key={entry.uuid}>
                            <h1>- {entry.categoryTitle}</h1>
                            <div className="categoryEdit" >
                                <button id="edit-entry" onClick={() => handleEditCategoryEntry(entry.uuid)}>
                                    Edit Category
                                </button>
                                <button id="delete-entry" onClick={() => deleteCategoryEntry(entry.uuid)}>
                                    Delete category
                                </button>
                            </div>
                        </div>
                        )
                    })}
                    <button id="new-entry" onClick={handleNewCategoryEntry}>
                        New Category
                    </button>
                </div>
            }
        </>
    )
}

export default Categories;