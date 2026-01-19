# Export Pattern Documentation

## Consistent Export Pattern

All backend files now use the `exports.` pattern for consistency and clarity.

## Pattern Usage

### Controllers
```javascript
exports.functionName = asyncHandler(async (req, res, next) => {
  // Controller logic
});
```

### Validators
```javascript
exports.validationName = [
  body('field').validation().withMessage('message')
];
```

### Middleware
```javascript
exports.middlewareName = async (req, res, next) => {
  // Middleware logic
};
```

### Models (Exception)
Models still use `module.exports` because they export a single Mongoose model:
```javascript
module.exports = mongoose.model('ModelName', schema);
```

### Utils (Exception)
Utility classes and single exports use `module.exports`:
```javascript
module.exports = ClassName;
// or
module.exports = functionName;
```

## Benefits

1. **Consistency**: All files follow the same pattern
2. **Clarity**: Easy to see what's being exported
3. **Maintainability**: Simple to add new exports
4. **Readability**: Clean and organized code

## File Structure

```
backend/
├── controllers/     # exports.functionName
├── validators/      # exports.validationName
├── middleware/      # exports.middlewareName
├── models/          # module.exports (single model)
├── utils/           # module.exports (single export)
└── routes/          # module.exports (single router)
```