#
# -- Writing data from Arduino Serial Monitor to CSV file -- 
# -- 13th September 2021 -- 
# 
# --  https://github.com/kieranmachale --
#
import os
import serial
import glob
import time
# -------------------------------------------------------------------------------------------------------

arduino_port = "/dev/cu.usbmodem1421" # Port connected to arduino via USB
arduino_baud = 9600 # Baud rate data in transmitted between arduino and serial port
fileName = "measurement_data.csv" # New file created each time
maxSamples = 270 # This number is based on trial and error
print_labels = False # Current line being printed

# -------------------------------------------------------------------------------------------------------

ser = serial.Serial(arduino_port, arduino_baud)
print("Connected to arduino port" + arduino_port)

if(glob.glob('**/*.csv', recursive=True)):
    print("File already exists")
    time.sleep(1)
    print("Deleting...\n")
    time.sleep(1)
    os.remove(glob.glob('**/*.csv', recursive=True)[0])

file = open(fileName, "w")              # Create new CSV file
print("Created CSV file")

# -------------------------------------------------------------------------------------------------------

line = 0

# Should run 360 times until all measurements have been written
while line <= maxSamples:

    if print_labels:
        if line == 0:
            print("Printing Column Headers")
        else:
            print("\t\tLine " + str(line) + ": writing...")
    getData = str(ser.readline())
    data = getData[2:][:-5]
    print(data)

    file = open(fileName, "a")
    file.write(data + "\n")
    line = line + 1

print("Data collection complete!")


