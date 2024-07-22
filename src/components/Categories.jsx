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
            categoryInputTypes: {
                name: false,
                location: true,
                description: true,
                startDate: true,
                endDate: true,
            },
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
    function handleCategoryTitleChange(e) {
        setFormData({
            ...formData,
            categoryTitle: e.target.value,
        })
    }

    function handleCategoryInputTypesChange(e) {
        const {name, checked} = e.target;
        setFormData({
            ...formData,
            categoryInputTypes: {
                ...formData.categoryInputTypes,
                [name]: checked,
            },
        })
    }

    function addCategoryItem() {
        const updatedCategoryItems = [...formData.categoryItems, {
            value: "",
            description: "",
            startDate: "",
            endDate: "",
            uuid: uuid()
        }];

        setFormData({
            ...formData,
            categoryItems: updatedCategoryItems,
        })   
    }

    function handleCategoryItemChange(e, uuidItemToChange) {
        const {name, value} = e.target;
        const updatedCategoryItems = [...formData.categoryItems].map((item) => {
            if (item.uuid === uuidItemToChange) {
                item = {
                    ...item, 
                    [name]: value
                };
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
    // console.log("CategoriesList:")
    // console.log(categoriesList);
    console.log("FormData:")
    console.log(formData);

    return (
        <>
            {editId ? 
                // Edit Mode
                <div className="form categories">
                    <div className="form-inputs categories">
                        <label htmlFor="categoryTitle">Name your category
                            <input
                                name = "categoryTitle"
                                type = "text"
                                value = {formData.categoryTitle}
                                onChange = {(e) => handleCategoryTitleChange(e)}
                            />
                        </label>

                        <fieldset>
                            <legend>Choose your new category features:</legend>
                            {Object.keys(formData.categoryInputTypes).map((type, index) => {
                                return (
                                    <div key={index}>
                                        <input type="checkbox" name={type} 
                                            checked={formData.categoryInputTypes[type]}
                                            onChange={(e) => handleCategoryInputTypesChange(e)}
                                        />
                                        <label htmlFor="type">{type}</label>
                                    </div>
                                )
                            })}
                        </fieldset>
                    </div>  

                    <div className="form-controls categories">
                        <button id="cancel" onClick={handleCancel}>Cancel</button>
                        <button id="save" onClick={handleSave}>Save</button>
                    </div>
                </div>
            
            : 
                // Display Mode -  display each new category as own loader-box
                <div className="list categories">
                    {categoriesList.map((entry) => {
                        return (
                        <div className="loader-box"  key={entry.uuid}>
                            <button id="edit-entry" onClick={() => handleEditCategoryEntry(entry.uuid)}>
                                Edit Category
                            </button>
                            <button id="delete-entry" onClick={() => deleteCategoryEntry(entry.uuid)}>
                                Delete category
                            </button>
                            <h2 className="loader-title">
                                {entry.categoryTitle != "" ? entry.categoryTitle : "Unnamed Category"}
                            </h2>

                            {entry.categoryItems.map((item) => {
                                return (
                                <div className="entry categoryItem" key={item.uuid}>
                                    <div className="entry-summary categoryItem">
                                        {item.value}
                                    </div>
                                    <div className="entry-controls categoryItem">
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
                        )
                    })}
                    <button id="new-entry" onClick={handleNewCategoryEntry}>
                        Add Category +
                    </button>
                </div>
            }
        </>
    )
}

export default Categories;