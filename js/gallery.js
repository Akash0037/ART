// Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Gallery Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Painting Details Modal
    const paintingModal = document.getElementById('paintingModal');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalDescription = document.getElementById('modalDescription');
    const modalYear = document.getElementById('modalYear');
    const modalMedium = document.getElementById('modalMedium');
    const modalAvailability = document.getElementById('modalAvailability');
    const imageSize = document.getElementById('imageSize');
    const imageMaterial = document.getElementById('imageMaterial');
    
    // Painting data for all artworks (now using data attributes from HTML)
    // This function extracts data from the clicked element's data attributes
    function getPaintingDataFromElement(element) {
        return {
            title: element.getAttribute('data-title') || element.querySelector('.gallery-title').textContent,
            description: element.getAttribute('data-description') || "A beautiful piece from the artist's collection, showcasing unique textures and emotional depth.",
            year: element.getAttribute('data-year') || "2024",
            medium: element.getAttribute('data-medium') || "Mixed Media",
            availability: element.getAttribute('data-availability') || "Available",
            size: element.getAttribute('data-size') || "40x60 cm",
            material: element.getAttribute('data-material') || "Canvas",
            category: element.getAttribute('data-category') || "Painting"
        };
    }
    
    // Open modal when clicking on gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imageSrc = this.querySelector('img').getAttribute('src');
            const paintingInfo = getPaintingDataFromElement(this);
            
            // Set modal content
            modalImage.src = imageSrc;
            modalImage.alt = paintingInfo.title;
            modalTitle.textContent = paintingInfo.title;
            modalCategory.textContent = paintingInfo.category.charAt(0).toUpperCase() + paintingInfo.category.slice(1);
            modalDescription.textContent = paintingInfo.description;
            modalYear.textContent = paintingInfo.year;
            modalMedium.textContent = paintingInfo.medium;
            modalAvailability.textContent = paintingInfo.availability;
            imageSize.textContent = paintingInfo.size;
            imageMaterial.textContent = paintingInfo.material;
            
            // Set availability class
            modalAvailability.className = 'modal-availability';
            modalAvailability.classList.add(paintingInfo.availability.toLowerCase());
            
            // Show modal
            paintingModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    function closeModal() {
        paintingModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    paintingModal.addEventListener('click', function(e) {
        if (e.target === paintingModal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && paintingModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Inquire button
    const inquireBtn = document.getElementById('inquireBtn');
    if (inquireBtn) {
        inquireBtn.addEventListener('click', function() {
            const title = modalTitle.textContent;
            // Redirect to contact page with pre-filled message
            window.location.href = `contact.html?subject=Inquiry about "${title}"&message=I'm interested in learning more about "${title}". Please contact me with availability and pricing information.`;
        });
    }
    
    // Share button
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            const title = modalTitle.textContent;
            const description = modalDescription.textContent;
            const url = window.location.href;
            const shareText = `Check out "${title}" by Ashim ART: ${description.substring(0, 100)}...`;
            
            if (navigator.share) {
                navigator.share({
                    title: `${title} - Ashim ART`,
                    text: shareText,
                    url: url
                }).catch(err => {
                    console.log('Error sharing:', err);
                    copyToClipboard(`${title} - ${url}`);
                });
            } else {
                // Fallback for browsers that don't support Web Share API
                copyToClipboard(`${title} - ${url}`);
            }
        });
    }
    
    // Helper function to copy to clipboard
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Link copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Link copied to clipboard!');
        });
    }
    
    // Helper function to show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-gold);
            color: var(--text-dark);
            padding: 12px 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-md);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Add keyframe animations for notification
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});