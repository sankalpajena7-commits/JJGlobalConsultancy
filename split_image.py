import sys
from PIL import Image

try:
    img = Image.open('/Users/sankalpajena/.gemini/antigravity/brain/33e55ab9-daab-4ba7-880d-9c8406bee8da/media__1784736608576.png').convert('RGB')
    width, height = img.size
    print(f"Size: {width}x{height}")
    
    w3 = width // 3
    h2 = height // 2
    
    img.crop((0, 0, w3, h2)).save('images/work-culture-1.jpg')
    img.crop((w3, 0, 2*w3, h2)).save('images/work-culture-2.jpg')
    img.crop((2*w3, 0, width, h2)).save('images/work-culture-3.jpg')
    img.crop((0, h2, w3, height)).save('images/work-culture-4.jpg')
    
    print("Cropped successfully!")
except Exception as e:
    print(e)
