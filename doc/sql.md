# recup promo par order alphabetique

select * from promo order by name;

# Tous les étudiants, dans l’ordre alphabétique des noms de famille
select * from student order by last_name;

# Tous les étudiants de la promo 135
select * from student where promo_id = 135;

# les étudiants dont le nom ou le prénom ressemble à « max »
select * from student where first_name like '%Max%' OR last_name like '%Max%';

# A DEMANDER A LUC select lower(first_name) as first_name, lower(last_name) as last_name from student where lower(first_name) like '%max%' OR lower(last_name) like '%max%';