/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import Popper from '@scaleflex/ui/core/popper';

/** Internal Dependencies */
import { StyledImagesGallery, StyledImageWrapper } from './Image.styled';

const ImagesGallery = ({ gallery, anchorEl, onClose, onSelect }) => (
    <div>
      {gallery.map(({ name ,originalUrl, previewUrl }) => (
        <StyledImageWrapper
          title={name}
          key={originalUrl}
          onClick={() => onSelect(originalUrl)}
        >
          <img
            src={previewUrl}
            alt={previewUrl}
            crossOrigin="Anonymous"
            draggable={false}
          />
        </StyledImageWrapper>
      ))}
    </div>
);
ImagesGallery.defaultProps = {
  gallery: [],
  anchorEl: null,
};

ImagesGallery.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  gallery: PropTypes.arrayOf(Object),
  anchorEl: PropTypes.instanceOf(Object),
};

export default ImagesGallery;