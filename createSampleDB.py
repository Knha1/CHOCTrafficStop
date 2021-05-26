import json
import csv

OUTPUT_FILENAME = 'sampleDB.json'
QUESTIONS_FILENAME = 'questions.json'
RESOURCES_FILENAME = 'resources.json'
CREATE_QUESTIONS_JSON = False
CREATE_RESOURCES_JSON = False

# Create empty dictionaries for sample data
d = dict()

patients = dict()
patient1 = dict()
patient2 = dict()

reso = dict()

questions = dict()

admins = dict()
admin1 = dict()

data = dict()
d1 = dict()
d2 = dict()

regCodes = dict()

# --- PATIENTS ---
patient1['patient_id'] = 1
patient1['reg_code'] = 'GUEST'
patient2['patient_id'] = 2
patient2['reg_code'] = 'CHOC1'

patients[1] = patient1
patients[2] = patient2
patients['num_patients'] = 2

d['patient'] = patients

# --- RESOURCES ---
# 1. Download resources from spreadsheet as .tsv file
# 2. Rename input file as 'r.tsv'
# 3. Place in same directory as 'createSampleDB.py'
with open('r.tsv', 'r') as infile:
    rd = csv.reader(infile, delimiter='\t')
    rowIndex = 0
    for r in rd:
        # Ignore line 0 (header)
        if rowIndex != 0:
            newResource = dict()

            newResource['resource_id'] = r[0]
            newResource['name'] = r[1]
            newResource['category'] = r[3]
            newResource['availability'] = r[5]
            newResource['description'] = r[2]
            newResource['organization'] = r[4]
            newResource['website'] = r[9]
            newResource['phone_num'] = r[6]
            newResource['address'] = r[7]
            newResource['email'] = r[8]

            # Split tags by comma, then into a list
            tags = r[10].split(',')
            newResource['tags'] = [tag.strip().lower() for tag in tags]
            reso[rowIndex] = newResource

        rowIndex += 1

reso['num_resources'] = len(reso)
d["resource"] = reso

# --- QUESTIONS ---
# 1. Download questions from spreadsheet as .tsv file
# 2. Rename input file as 'q.tsv'
# 3. Place in same directory as 'createSampleDB.py'
with open('q.tsv', 'r') as infile:
    rd = csv.reader(infile, delimiter='\t')
    rowIndex = 0
    for q in rd:
        # Ignore lines 0 and 29+ (change as needed)
        if not (rowIndex == 0 or rowIndex >= 29):
            q_data = dict()

            ac_yn = dict()
            ac_yn['1'] = "Yes"
            ac_yn['2'] = "No"

            ac_std = dict()
            ac_std['1'] = "Crisis"
            ac_std['2'] = "Surviving"
            ac_std['3'] = "OK"
            ac_std['4'] = "Good"
            ac_std['5'] = "Great"

            ac_mod1 = dict()    # For qid 9
            ac_mod1['1'] = "Very Bad"
            ac_mod1['2'] = "Bad"
            ac_mod1['3'] = "OK"
            ac_mod1['4'] = 'Good'
            ac_mod1['5'] = 'Very Good'

            ac_mod2 = dict()    # For qid 18-22
            ac_mod2['1'] = "Rarely (None or 1-3 times/month)"
            ac_mod2['2'] = "Sometimes (1-2 times/week)"
            ac_mod2['3'] = "Often (3-5 times/week)"
            ac_mod2['4'] = "Almost (6-7 times/week)"
            ac_mod2['5'] = "Always (Everyday)"

            q_data['question_id'] = q[0]
            q_data['category'] = q[3]
            q_data['order'] = q[4]
            q_data['text'] = q[1]
            q_data['type'] = q[2]
            if q[2] == 'Yes/No':
                q_data['answer_choices'] = ac_yn
            elif q[2] == 'Likert':
                q_data['answer_choices'] = ac_std
            elif q[2] == 'Likert (Modified)':
                if rowIndex == 9:
                    q_data['answer_choices'] = ac_mod1
                else:
                    q_data['answer_choices'] = ac_mod2

            # Match up tags to answers
            q_tags = dict()
            split_tags = q[6].split('=')
            if q[2] == 'Yes/No':
                q_tags['1'] = split_tags[0].strip().split(',')
                q_tags['2'] = split_tags[1].strip().split(',')
            else:
                q_tags['1'] = split_tags[0].strip().split(',')
                q_tags['2'] = split_tags[1].strip().split(',')
                q_tags['3'] = split_tags[2].strip().split(',')
                q_tags['4'] = split_tags[3].strip().split(',')
                q_tags['5'] = split_tags[4].strip().split(',')
            q_data['tags'] = q_tags

            questions[rowIndex] = q_data
        rowIndex += 1

d['question'] = questions

# --- ADMINS ---
admin1['admin_id'] = 1
admin1['username'] = 'CHOCAdmin'
admin1['password'] = 'trafficstop'

admins[1] = admin1

d['admin'] = admins


# --- DATA ---
d1['data_id'] = 1
d1['resource_id'] = 1
d1['patient_id'] = 1
d1['reg_code'] = 'GUEST'
d1['year'] = 2021
d1['month'] = 2


d2['data_id'] = 2
d2['resource_id'] = 2
d2['patient_id'] = 2
d2['reg_code'] = 'CHOC1'
d2['year'] = 2021
d2['month'] = 3


data[1] = d1
data[2] = d2
data['num_data'] = 2

# --- REGISTRATION CODES ---
regCodes['1'] = 'GUEST'
regCodes['2'] = 'CHOC1'

d['reg_codes'] = regCodes

d['data'] = data


# Create Sample DB JSON
with open(OUTPUT_FILENAME, 'w') as outfile:
    json.dump(d, outfile)
print(f'Completed creating sample JSON, output file: {OUTPUT_FILENAME}')

# Create Questions JSON
if CREATE_QUESTIONS_JSON:
    with open(QUESTIONS_FILENAME, 'w') as outfile:
        json.dump(questions, outfile)
    print(
        f'Completed creating questions JSON, output file: {QUESTIONS_FILENAME}')

# Create Resourcess JSON
if CREATE_RESOURCES_JSON:
    with open(RESOURCES_FILENAME, 'w') as outfile:
        json.dump(reso, outfile)
    print(
        f'Completed creating resources JSON, output file: {RESOURCES_FILENAME}')
