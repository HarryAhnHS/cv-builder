import uuid from "react-uuid";
import {useState} from "react";

import NewCategory from './NewCategory';

import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
                <Form className="bg-light mt-3 p-3">
                    <Form.Group className="mb-3" controlId="categoryTitle">
                        <Form.Label>Name your category</Form.Label>
                        <Form.Control type="text" placeholder="Skills" 
                            name="categoryTitle"
                            value = {formData.categoryTitle}
                            onChange = {(e) => handleCategoryTitleChange(e)}
                        />
                    </Form.Group>
        
                    <Form.Group className="mb-3" controlId="categoryInputTypes">
                        <Form.Label>Choose your category features:</Form.Label>
                        {Object.keys(formData.categoryInputTypes).map((data, index) => {
                                return (
                                    <>
                                        <Form.Check 
                                            key={index} // prettier-ignore
                                            type="switch"
                                            id="custom-switch"
                                            label={data}
                                            checked={formData.categoryInputTypes[data].exists}
                                            onChange={(e) => handleCategoryInputTypesChange(e)}
                                            name={data} 
                                        />
                                    </>
                                )
                            })}
                    </Form.Group>
                    <div className="form-controls category">
                        <Button variant="primary" onClick={handleSave} active>
                            Save
                        </Button>{' '}
                        <Button variant="secondary" onClick={handleCancel} active>
                            Cancel
                        </Button>
                    </div>
                </Form>
            
            : 
                // Display Mode -  display each new category as own loader-box
                <div className="">
                    {categoriesList.map((entry) => {
                        return (
                        <Accordion.Item eventKey={entry.uuid} key={entry.uuid}>
                            <Accordion.Header>
                            <div className="fs-4 fw-light">
                                {entry.categoryTitle != "" ? entry.categoryTitle : "Unnamed Category"}
                            </div>
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
                    <div className="d-flex my-4 rounded">
                        <Button variant="primary" className="flex-fill" onClick={handleNewCategory}>
                            Add new category
                        </Button>
                    </div>
                </div>
            }
        </>
    )
}

export default Categories;