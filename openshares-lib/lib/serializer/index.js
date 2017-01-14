module.exports = {
    
    // Primary class for creating operations
    Serializer: require('./src/serializer'),
    
    // helper functions for creating operations
    fp: require('./src/FastParser'),
    
    // Low level types
    types: require('./src/types'),
    
    // Higher level operations (made out of generic types)
    ops: require('./src/operations'),
    
    // Utility that generates JSON examples
    template: require('./src/template'),

    // Serializer validation
    SerializerValidation: require('./src/SerializerValidation'),
}
