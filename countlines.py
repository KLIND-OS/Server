import os

def is_text_file(filename):
    
    text_extensions = ['.py', '.json', '.html', '.css', '.js', ".scss"]

    
    return os.path.splitext(filename)[1].lower() in text_extensions

def count_lines_in_files(folder_path):
    
    total_lines = 0

    
    for root, dirs, files in os.walk(folder_path):
        
        for file in files:
            file_path = os.path.join(root, file)

            
            if is_text_file(file) and not 'libs/' in file_path and not '.git/' in file_path and not 'node_modules/' in file_path:
            #if is_text_file(file):
                try:
                    
                    with open(file_path, 'r', encoding='utf-8') as f:
                        lines = f.readlines()
                        total_lines += len(lines)
                except UnicodeDecodeError:
                    
                    pass

    return total_lines

if __name__ == "__main__":
    
    folder_path = '.'

    if not os.path.exists(folder_path):
        print("Folder path does not exist.")
    else:
        total_lines = count_lines_in_files(folder_path)
        print(f"Počet řádků: {total_lines}")
