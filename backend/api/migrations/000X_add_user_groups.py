from django.db import migrations

def create_groups_and_assign_users(apps, schema_editor):
    Group = apps.get_model('auth', 'Group')
    User = apps.get_model('auth', 'User')

    # Create or get the 'Read-Only' group
    read_only_group, created = Group.objects.get_or_create(name='Read-Only')

    # Create or get the 'Read-Write' group
    read_write_group, created = Group.objects.get_or_create(name='Read-Write')

    # Assign users to the groups based on criteria
    for user in User.objects.all():
        if user.username.startswith("read_only"):
            user.groups.add(read_only_group)
        else:
            user.groups.add(read_write_group)

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),  # Ensure this is the correct previous migration
    ]

    operations = [
        migrations.RunPython(create_groups_and_assign_users),
    ]