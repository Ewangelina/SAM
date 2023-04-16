def process(line):
    ret = line.replace("\n","")
    return ret

inf = open("localhost.html")
outf = open("output.txt", "w")

for line in inf:
    output = "res.write(`" + process(line) + "`);\n" 
    outf.write(output)

