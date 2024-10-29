-- region
insert into region (region_name) values ('Singapore');
insert into region (region_name) values ('US');

-- cycle_config
insert into cycle_config (day_cycle, hour_cycle) values (1, 19);

-- questions
insert into questions (question, choices, correct_answer, region_id) values
('What is 4 + 2 ?', '[{"a": 6}, {"b": 8}, {"c": 9}, {"d": 7}]', 'a', 1);

insert into questions (question, choices, correct_answer, region_id) values
('Who is the first president of US?', '[{"a": "Abraham Lincoln"}, {"b": "George Washington"}, {"c": "George Bush"}, {"d": "Barack Obama"}]', 'b', 1);

insert into questions (question, choices, correct_answer, region_id) values
('What is the neighboring country of Singapore accessible by car?', '[{"a": "Thailand"}, {"b": "Indonesia"}, {"c": "Brunei"}, {"d": "Malaysia"}]', 'd', 2);

insert into questions (question, choices, correct_answer, region_id) values
('What is COE in car registration in Singapore?', '[{"a": "Certificate Of Excellence"}, {"b": "Certification Of English"}, {"c": "Certificate Of Entitlement"}, {"d": "I do not know"}]', 'c', 2);