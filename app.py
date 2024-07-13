from flask import Flask, request, jsonify, send_file
import pandas as pd
import os

app = Flask(__name__)

@app.route('/upload-group-info', methods=['POST'])
def upload_group_info():
    file = request.files['file']
    group_info = pd.read_csv(file)
    # Process and validate CSV
    return jsonify({"message": "Group info uploaded successfully"})

@app.route('/upload-hostel-info', methods=['POST'])
def upload_hostel_info():
    file = request.files['file']
    hostel_info = pd.read_csv(file)
    # Process and validate CSV
    return jsonify({"message": "Hostel info uploaded successfully"})

@app.route('/allocate-rooms', methods=['POST'])
def allocate_rooms():
    # Implement room allocation algorithm
    allocation_results = []
    return jsonify(allocation_results)

@app.route('/download-allocation', methods=['GET'])
def download_allocation():
    # Provide CSV download of the allocation
    file_path = "allocation_results.csv"
    return send_file(file_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
