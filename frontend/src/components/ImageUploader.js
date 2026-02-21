import { useState } from 'react';
import { Upload, X, Star } from 'lucide-react';

const ImageUploader = ({ images, setImages, maxImages = 10 }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const remainingSlots = maxImages - images.length;
    const filesToAdd = fileArray.slice(0, remainingSlots);

    const newImages = filesToAdd.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      isPrimary: images.length === 0, // First image is primary by default
    }));

    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);

    // If removed image was primary, make first image primary
    if (newImages.length > 0 && !newImages.some((img) => img.isPrimary)) {
      newImages[0].isPrimary = true;
    }

    setImages(newImages);
  };

  const setPrimaryImage = (index) => {
    const newImages = images.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));
    setImages(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragActive
              ? 'border-secondary bg-secondary/5'
              : 'border-gray-300 hover:border-secondary'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="font-body text-gray-700 mb-2">
            <span className="text-secondary font-semibold">Click to upload</span> or
            drag and drop
          </p>
          <p className="font-body text-sm text-gray-500">
            PNG, JPG, JPEG up to 10MB ({images.length}/{maxImages} images)
          </p>
        </div>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-xl overflow-hidden group"
            >
              <img
                src={image.preview}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {/* Set as Primary Button */}
                <button
                  type="button"
                  onClick={() => setPrimaryImage(index)}
                  className={`p-2 rounded-lg transition-colors ${
                    image.isPrimary
                      ? 'bg-secondary text-white'
                      : 'bg-white/90 text-gray-700 hover:bg-white'
                  }`}
                  title="Set as primary image"
                >
                  <Star
                    className={`w-5 h-5 ${image.isPrimary ? 'fill-current' : ''}`}
                  />
                </button>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  title="Remove image"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Primary Badge */}
              {image.isPrimary && (
                <div className="absolute top-2 left-2 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      {images.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="font-body text-sm text-blue-800">
            💡 Click the star icon to set an image as the primary photo. The primary
            image will be shown first in listings.
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
