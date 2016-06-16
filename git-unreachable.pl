#!/usr/bin/perl
use warnings;
use strict;
my ($dat, $line, $y);
$y = 0;
open $dat, "git fsck --unreachable |"
    or die "Couldn't run `git-fsck': $!\n";
LINE: while ($line = <$dat>) {
    chomp $line;
    my ($u, $type, $id) = split / +/, $line;
    next LINE unless ($type eq 'commit');
    print "\n Showing `$id'\n\n";
    system(( "git", "show", "--patch", "$id" ));
    print "\n Has this been the commit you were looking for? (y/N) ";
    my $ans = <STDIN>;
    chomp $ans;
    if ($ans eq 'y' || $ans eq 'Y') {
        $y = 1;
        print "\n The chosen commit's id is: `$id'\n\n";
        last LINE;
    }
}
if ($y != 1) {
    print "\n Sorry, I couldn't help you it would seem.\n\n";
}
close $dat;