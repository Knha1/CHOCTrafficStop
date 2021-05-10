import json
import csv

OUTPUT_FILENAME = 'sampleDB.json'
QUESTIONS_FILENAME = 'questions.json'
CREATE_QUESTIONS_JSON = True

# Create empty dictionaries for sample data
d = dict()

patients = dict()
patient1 = dict()
patient2 = dict()

reso = dict()
reso1 = dict()
reso2 = dict()
reso3 = dict()
reso4 = dict()

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
reso1['resource_id'] = 1
reso1['name'] = 'How Much Sleep Do I Need?'
reso1['category'] = 'Sleep'
reso1['availability'] = '24/7 (Online Resource)'
reso1['description'] = 'Describes how much sleep teens should be getting'
reso1['organization'] = 'CHOC'
reso1['website'] = 'https://kidshealth.org/CHOC/en/teens/how-much-sleep.html'
reso1['phone_num'] = '###-###-###1'
reso1['address'] = 'Addy1'
reso1['email'] = 'email1'

reso2['resource_id'] = 2
reso2['name'] = '5 Ideas for Better Sleep'
reso2['category'] = 'Sleep'
reso2['availability'] = '24/7 (Online Resource)'
reso2['description'] = 'Sample description2'
reso2['organization'] = 'CHOC'
reso2['website'] = 'https://kidshealth.org/CHOC/en/teens/tips-sleep.html'
reso2['phone_num'] = '###-###-###2'
reso2['address'] = 'addy2'
reso2['email'] = 'email2'

reso3['resource_id'] = 3
reso3['name'] = 'Healthy Relationships with Food & Exercise'
reso3['category'] = 'Food / Fitness'
reso3['availability'] = '24/7 (Online Resource)'
reso3['description'] = 'Sample description3'
reso3['organization'] = 'CHOC'
reso3['website'] = 'https://kidshealth.org/CHOC/en/teens/food-fitness'
reso3['phone_num'] = '###-###-###3'
reso3['address'] = 'email3'
reso3['email'] = 'email3'

reso4['resource_id'] = 4
reso4['name'] = 'Safety Planning'
reso4['category'] = 'Safety'
reso4['availability'] = 'Monday – Friday (12:00PM – 8:00PM)\nSaturday (12:00PM – 4:00PM)'
reso4['description'] = 'Sample description4'
reso4['organization'] = 'Project Choice'
reso4['website'] = 'https://www.orangewood4you.org/sex_trafficking_csec_services/project-choice/'
reso4['phone_num'] = '714-619-0258'
reso4['address'] = '1575 E. 17th Street\nSanta Ana CA 92705'
reso4['email'] = "email4"

reso[1] = reso1
reso[2] = reso2
reso[3] = reso3
reso[4] = reso4

reso['num_resources'] = 4

d['resource'] = reso

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
            ac_std = dict()
            ac_std['1'] = "Rarely (None or 1-3 times/month)"
            ac_std['2'] = "Sometimes (1-2 times/week)"
            ac_std['3'] = "Often (3-5 times/week)"
            ac_std['4'] = "Almost (6-7 times/week)"
            ac_std['5'] = "Always (Everyday)"

            ac_mod1 = dict()    # For qid 9
            ac_mod1['1'] = "Very Bad"
            ac_mod1['2'] = "Bad"
            ac_mod1['3'] = "Ok"
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
                q_data['answer_choices'] = ''
            elif q[2] == 'Likert':
                q_data['answer_choices'] = ac_std
            elif q[2] == 'Likert (Modified)':
                if rowIndex == 9:
                    q_data['answer_choices'] = ac_mod1
                else:
                    q_data['answer_choices'] = ac_mod2
            questions[rowIndex] = q_data
        rowIndex += 1

d['question'] = questions

# --- ADMINS ---
admin1['admin_id'] = 1
admin1['username'] = 'myUsername'
admin1['password'] = 'myPassword'

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
