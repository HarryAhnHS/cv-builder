import uuid from "react-uuid";
import {useState} from "react";

import NewCategory from './NewCategory';

import Accordion from 'react-bootstrap/Accordion';

function Categories({onDataChange}) {

    const [editId, setEditId] = useState(null); // ID of the currently edited category
    const [categoriesList, setCategoriesList] = useState([]); // List of all categories
    const [formData, setFormData] = useState({}); // Temporary state for the form being edited
    

    // Categories 

    // Create new entry - append a default entry into list's state
    function handleNewCategory() {
        const defaultCategory = {
            categoryTitle: '',
            categoryItems: [],
            categoryInputTypes: {
                Title: {
                    exists: true, 
                    inputType: 'text',
                    element: 'input',
                },
                Location: {
                    exists: true, 
                    inputType: 'text',
                    element: 'input',
                },
                Description: {
                    exists: true, 
                    inputType: 'text',
                    element: 'textarea',
                },
                StartDate: {
                    exists: true, 
                    inputType: 'month',
                    element: 'input',
                },
                EndDate: {
                    exists: true, 
                    inputType: 'month',
                    element: 'input',
                },
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

    function handleEditCategory(uuidCategoryToEdit) {
        const categoryToEdit = categoriesList.find((entry) => entry.uuid === uuidCategoryToEdit);

        setFormData(categoryToEdit);
        setEditId(uuidCategoryToEdit);
    }


    function handleDeleteCategory(uuidToDelete) {
        const updatedCategoriesList = [...categoriesList].filter((entry) => entry.uuid !== uuidToDelete);

        setCategoriesList(updatedCategoriesList);
        onDataChange("categories", updatedCategoriesList);
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
                [name]: {
                    ...formData.categoryInputTypes[name],
                    exists: checked,
                }
            },
        })
    }

    function handleCancel() {
        setEditId(null);
        setFormData({});
    }

    function handleSave() {
        
        const updatedCategoriesList = [...categoriesList].map((cat) => {
                console.log(editId)
                console.log(cat)
                if (cat.uuid === editId) {
                    if (JSON.stringify(cat.categoryInputTypes) != JSON.stringify(formData.categoryInputTypes)) {
                        // If submitted changes changed input types, reset all entries
                        return {
                            ...formData,
                            categoryItems: [],
                        };
                    }
                    return formData
                }
                return cat;
        })

        setCategoriesList(updatedCategoriesList);
        onDataChange("categories", updatedCategoriesList);
        
        setEditId(null);
        setFormData({});
    }

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
                            <legend>Choose your category features:</legend>
                            <p>Careful as this will reset entries</p>
                            {Object.keys(formData.categoryInputTypes).map((data, index) => {
                                return (
                                    <div key={index}>
                                        <input type="checkbox" name={data} 
                                            checked={formData.categoryInputTypes[data].exists}
                                            onChange={(e) => handleCategoryInputTypesChange(e)}
                                        />
                                        <label htmlFor="type">{data}</label>
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
                        <Accordion.Item eventKey={entry.uuid} key={entry.uuid}>
                            <Accordion.Header>
                                {entry.categoryTitle != "" ? entry.categoryTitle : "Unnamed Category"}
                            </Accordion.Header>
                            <Accordion.Body>
                                <NewCategory 
                                    entry={entry} 
                                    categoriesList={categoriesList} 
                                    setCategoriesList={setCategoriesList} 
                                    onDataChange={onDataChange} 
                                />
                                <div className="category-entry-controls">
                                    <button id="edit-entry" onClick={() => handleEditCategory(entry.uuid)}>
                                    Edit Category
                                    </button>
                                    <button id="delete-entry" onClick={() => handleDeleteCategory(entry.uuid)}>
                                    Delete category
                                    </button>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        )
                    })}
                    <button id="new-entry" onClick={handleNewCategory}>
                        Add New Category +
                    </button>
                </div>
            }
        </>
    )
}

export default Categories;