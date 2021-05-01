import json

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
q1 = dict()
q2 = dict()
q3 = dict()

admins = dict()
admin1 = dict()

data = dict()
d1 = dict()
d2 = dict()

# Assign

# --- patients ---
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
q1['question_id'] = 1
q1['category'] = 'Mental Health'
q1['order'] = 1
q1['text'] = 'Are you in crisis or distress where you feel like hurting yourself?'
q1['type'] = 'Yes or No'
q1['answer_choices'] = ''

q2['question_id'] = 2
q2['category'] = 'Physical Health & Wellbeing'
q2['order'] = 10
q2['text'] = 'Do you have trouble falling asleep?'
q2['type'] = 'Likert Scale (Modified)'
ac = {
	1: "Rarely (None or 1-3 times/month)",
	2: "Sometimes (1-2 times/week)",
	3: "Often (3-5 times/week)",
	4: "Almost (6-7 times/week)",
	5: "Always (Everyday)"
}
q2['answer_choices'] = ac

q3['question_id'] = 3
q3['category'] = 'Safety and Security'
q3['order'] = 5
q3['text'] = 'What is your level of stress?'
q3['type'] = 'Likert Scale (Standard)'
q3['answer_choices'] = ''

questions[1] = q1
questions[2] = q2

questions['num_questions'] = 2

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

d['data'] = data


# Write
with open('testdata.json', 'w') as outfile:
	json.dump(d, outfile)
print('done')