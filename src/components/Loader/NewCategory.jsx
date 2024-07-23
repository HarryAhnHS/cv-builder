import uuid from "react-uuid";
import {useState} from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
                    <Form>
                        {Object.keys(entry.categoryInputTypes).map((key) => {
                            return entry.categoryInputTypes[key].exists 
                            ?
                                (entry.categoryInputTypes[key].element == 'textarea')
                                ?
                                    <Form.Group className="mb-3" controlId="categoryItemDescription">
                                        <Form.Label>Add a description</Form.Label>
                                        <Form.Control as="textarea" rows={3} 
                                            type="textarea" 
                                            name={key}
                                            value={formData[key]}
                                            onChange = {(e) => handleCategoryItemChange(e)}
                                        />
                                    </Form.Group>
                                :
                                    <Form.Group className="mb-3" controlId={key}>
                                        <Form.Label>{key == 'StartDate' ? 'Start Date': (key == 'EndDate' ? 'End Date' : key)}</Form.Label>
                                        <Form.Control 
                                            type= {entry.categoryInputTypes[key].inputType}
                                            name={key}
                                            value={formData[key]}
                                            onChange = {(e) => handleCategoryItemChange(e)}
                                        />
                                    </Form.Group>
                            :
                                null
                        })}
                        <div className="form-controls category-item">
                            <Button variant="primary" onClick={handleSave} active>
                                Save
                            </Button>{' '}
                            <Button variant="secondary" onClick={handleCancel} active>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                :
                    // Display Mode
                    <div className="list new-category">
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
                        <div className="d-grid">
                            <Button variant="outline-primary" onClick={addCategoryItem}>
                                Add item to {entry.categoryTitle}
                            </Button>
                        </div>
                    </div>
                }
            </>
        )
}

export default NewCategory;