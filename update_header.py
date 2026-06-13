import re

with open("correct_header.txt", "r", encoding="utf-8") as f:
    header = f.read()

# Ensure we just get the header block if there's any extra whitespace
header_block = header.strip()

with open("home-3.html", "r", encoding="utf-8") as f:
    content = f.read()

# Pattern to replace
pattern = re.compile(r'<!-- header start -->.*?<!-- header end -->', re.DOTALL)
new_content = pattern.sub(header_block, content)

with open("home-3.html", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Replaced header in home-3.html")
