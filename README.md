# Groceries Management App

## TO DO


### Hanging Routes


## DONE

### Unique names in database

### Home Route

### Error Handling

### Validation and Santization

### Create and Update Routes

### Create Category '/categories/create'

### Create Item '/categories/:category_name/items/create'

### Update Category '/categories/update'

### Update Item ''/categories/:category_name/items/update'

### Error Views

### Content && Styling


### Homepage

### Categories (Route) :-

### - get all categories

### - create category

### Category (Route) :-

### - update category

### - delete category

### - get all items

### - get item

### - create item

### - delete item

### Item (Route) :-

### - update item

## Database

### Categories 1 >> n Items

#### Categories ( ID , name , items_count )

#### Items ( ID , category_id(Categories) , name , description , quantity , price )

## Routes

### GET '/' >>> getCategories

### POST '/' >>> addCategory

### DELETE '/' >>> deleteCategory

### GET '/categories/:category_name' >>> getCategoryItems

### PUT '/categories/:category_name' >>> updateCategory

### DELETE '/categories/:category_name' >>> deleteItem

### POST '/categories/:category_name' >>> createItem

### GET '/categories/:category_name/:item_name' >>> getItem

### PUT '/categories/:category_name/:item_name' >>> updateItem
